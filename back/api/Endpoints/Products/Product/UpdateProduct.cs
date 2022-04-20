using api.Exceptions;
using api.Models;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product.Update;
using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product;

public class UpdateProduct : EndpointBaseAsync
  .WithRequest<UpdateProductRequest>
  .WithActionResult
{
  private readonly IProductRepo _productRepo;
  private readonly IProductsCategoriesRepo _pcRepo;
  private readonly ICategoryRepo _productCategoryRepo;
  private readonly IValidator<UpdateProductRequest> _validator;
  private readonly IGenericRepo<ProductImageLink> _imageRepo;
  private readonly IGenericRepo<ProductBulletPoint> _bulletPointRepo;
  private readonly IZincService _zincService;

  public UpdateProduct(
    IProductRepo productRepo,
    IProductsCategoriesRepo pcRepo,
    ICategoryRepo productCategoryRepo,
    IValidator<UpdateProductRequest> validator,
    IGenericRepo<ProductImageLink> imageRepo,
    IGenericRepo<ProductBulletPoint> bulletPointRepo, 
    IZincService zincService)
  {
    _productRepo = productRepo;
    _pcRepo = pcRepo;
    _productCategoryRepo = productCategoryRepo;
    _validator = validator;
    _imageRepo = imageRepo;
    _bulletPointRepo = bulletPointRepo;
    _zincService = zincService;
  }

  [Authorize(Policy = Policies.ManageProducts)]
  [HttpPatch(Routes.Products.ProductRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] UpdateProductRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var validationResult = await _validator.ValidateAsync(request, cancellationToken);
    if (!validationResult.IsValid) throw new BadRequestException(validationResult.ToString());

    var existingProduct = await _productRepo.GetOne(request.ProductId);
    if (existingProduct is null) throw new ProductNotFoundException(request.ProductId);

    if (request.Body.DeepestCategoryId is not null)
    {
      var category = await _productCategoryRepo.GetById(request.Body.DeepestCategoryId.Value);
      if (category is null) throw new ProductCategoryNotFoundException(request.Body.DeepestCategoryId.Value);
    }

    existingProduct.Name = request.Body.Name ?? existingProduct.Name;
    existingProduct.Description = request.Body.Description ?? existingProduct.Description;
    existingProduct.ShortDescription = request.Body.ShortDescription ?? existingProduct.ShortDescription;
    existingProduct.Price = request.Body.Price ?? existingProduct.Price;
    existingProduct.DiscountedPrice = request.Body.DiscountedPrice ?? existingProduct.DiscountedPrice;
    existingProduct.DiscountPercent = request.Body.DiscountPercent ?? existingProduct.DiscountPercent;
    existingProduct.DiscountAmount = request.Body.DiscountAmount ?? existingProduct.DiscountAmount;
    existingProduct.IsDiscounted = request.Body.IsDiscounted ?? existingProduct.IsDiscounted;
    existingProduct.DeepestCategoryId = request.Body.DeepestCategoryId ?? existingProduct.DeepestCategoryId;

    var updated = await _productRepo.Update(existingProduct);

    // update/add bullet points
    if (request.Body.BulletPoints != null)
    {
      foreach (var bulletPoint in request.Body.BulletPoints)
      {
        if (bulletPoint.Id is null)
        {
          var newBulletPoint = new ProductBulletPoint
          {
            ProductId = existingProduct.ProductId,
            Text = bulletPoint.Text
          };
          await _bulletPointRepo.Add(newBulletPoint);
          continue;
        }

        var existingBulletPoint = await _bulletPointRepo.GetById(bulletPoint.Id.Value);
        if (existingBulletPoint is null) continue;

        existingBulletPoint.Text = bulletPoint.Text;
      }
    }

    // update/add images
    if (request.Body.ImageLinks != null)
    {
      foreach (var imageLink in request.Body.ImageLinks)
      {
        if (imageLink.Id is null)
        {
          var newImageLink = new ProductImageLink()
          {
            ProductId = existingProduct.ProductId,
            Link = imageLink.Link
          };
          await _imageRepo.Add(newImageLink);
          continue;
        }

        var existingImageLink = await _imageRepo.GetById(imageLink.Id.Value);
        if (existingImageLink is null) continue;

        existingImageLink.Link = imageLink.Link;
      }
    }

    await _zincService.UpdateProduct(updated, request.Body.BulletPoints, request.Body.ImageLinks[0].Link);

    return Ok();
  }
}