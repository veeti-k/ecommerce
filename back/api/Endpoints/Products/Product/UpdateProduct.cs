using api.Exceptions;
using api.Models;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product.Update;
using api.Security.Policies;
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
  private readonly IValidator<UpdateProductDto> _validator;
  private readonly IGenericRepo<ProductImageLink> _imageRepo;
  private readonly IGenericRepo<ProductBulletPoint> _bulletPointRepo;

  public UpdateProduct(
    IProductRepo productRepo,
    IProductsCategoriesRepo pcRepo,
    ICategoryRepo productCategoryRepo,
    IValidator<UpdateProductDto> validator,
    IGenericRepo<ProductImageLink> imageRepo,
    IGenericRepo<ProductBulletPoint> bulletPointRepo)
  {
    _productRepo = productRepo;
    _pcRepo = pcRepo;
    _productCategoryRepo = productCategoryRepo;
    _validator = validator;
    _imageRepo = imageRepo;
    _bulletPointRepo = bulletPointRepo;
  }

  [Authorize(Policy = Policies.ManageProducts)]
  [HttpPatch(Routes.Products.ProductRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] UpdateProductRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var validationResult = await _validator.ValidateAsync(request.Dto, cancellationToken);
    if (!validationResult.IsValid) throw new BadRequestException(validationResult.ToString());

    var existingProduct = await _productRepo.GetOne(request.ProductId);
    if (existingProduct is null) throw new ProductNotFoundException(request.ProductId);

    if (request.Dto.DeepestCategoryId is not null)
    {
      var category = await _productCategoryRepo.GetById(request.Dto.DeepestCategoryId.Value);
      if (category is null) throw new ProductCategoryNotFoundException(request.Dto.DeepestCategoryId.Value);
    }

    existingProduct.Name = request.Dto.Name ?? existingProduct.Name;
    existingProduct.Description = request.Dto.Description ?? existingProduct.Description;
    existingProduct.Price = request.Dto.Price ?? existingProduct.Price;
    existingProduct.DiscountedPrice = request.Dto.DiscountedPrice ?? existingProduct.DiscountedPrice;
    existingProduct.DiscountPercent = request.Dto.DiscountPercent ?? existingProduct.DiscountPercent;
    existingProduct.DiscountAmount = request.Dto.DiscountAmount ?? existingProduct.DiscountAmount;
    existingProduct.IsDiscounted = request.Dto.IsDiscounted ?? existingProduct.IsDiscounted;
    existingProduct.DeepestCategoryId = request.Dto.DeepestCategoryId ?? existingProduct.DeepestCategoryId;

    await _productRepo.Update(existingProduct);

    // update/add bullet points
    if (request.Dto.BulletPoints != null)
    {
      foreach (var bulletPoint in request.Dto.BulletPoints)
      {
        if (bulletPoint.Id is null)
        {
          var newBulletPoint = new ProductBulletPoint
          {
            ProductId = existingProduct.Id,
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
    if (request.Dto.ImageLinks != null)
    {
      foreach (var imageLink in request.Dto.ImageLinks)
      {
        if (imageLink.Id is null)
        {
          var newImageLink = new ProductImageLink()
          {
            ProductId = existingProduct.Id,
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

    if (request.Dto.DeepestCategoryId == null && request.Dto.DeepestCategoryId == existingProduct.DeepestCategoryId)
      return Ok();

    var oldCategories = await _pcRepo.GetManyByProductId(existingProduct.Id);
    await _pcRepo.DeleteMany(oldCategories);

    var allCategories = await _productCategoryRepo.GetAll();

    var path = Utils.Categories.GetCategoryPath(allCategories,
      request.Dto.DeepestCategoryId ?? existingProduct.DeepestCategoryId);

    foreach (var category in path)
    {
      await _pcRepo.Add(new ProductsCategories()
      {
        ProductId = existingProduct.Id,
        CategoryId = category.Id
      });
    }

    return Ok();
  }
}