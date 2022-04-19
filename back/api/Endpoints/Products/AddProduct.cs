using api.Exceptions;
using api.Models;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product.Add;
using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace api.Endpoints.Products;

public class AddProduct : EndpointBaseAsync
  .WithRequest<AddProductRequest>
  .WithActionResult
{
  private readonly IProductRepo _repo;
  private readonly IGenericRepo<ProductImageLink> _imageRepo;
  private readonly IGenericRepo<ProductBulletPoint> _bulletPointRepo;
  private readonly ICategoryRepo _categoryRepo;
  private readonly IValidator<AddProductRequest> _validator;
  private readonly IZincService _zincService;

  public AddProduct(
    IProductRepo repo,
    IGenericRepo<ProductImageLink> imageRepo,
    IGenericRepo<ProductBulletPoint> bulletPointRepo,
    ICategoryRepo categoryRepo,
    IValidator<AddProductRequest> validator,
    IZincService zincService)
  {
    _repo = repo;
    _imageRepo = imageRepo;
    _bulletPointRepo = bulletPointRepo;
    _categoryRepo = categoryRepo;
    _validator = validator;
    _zincService = zincService;
  }

  [Authorize(Policy = Policies.ManageProducts)]
  [HttpPost(Routes.ProductsRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] AddProductRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var validationResult = await _validator.ValidateAsync(request, cancellationToken);
    if (!validationResult.IsValid) throw new BadRequestException(validationResult.ToString());

    var category = await _categoryRepo.GetById(request.Body.DeepestCategoryId);
    if (category is null) throw new ProductCategoryNotFoundException(request.Body.DeepestCategoryId);

    var newProduct = new Models.Product
    {
      Name = request.Body.Name,
      Description = request.Body.Description,
      ShortDescription = request.Body.ShortDescription,
      Price = request.Body.Price,
      DiscountAmount = request.Body.DiscountAmount,
      DiscountedPrice = request.Body.DiscountedPrice,
      DiscountPercent = request.Body.DiscountPercent,
      IsDiscounted = request.Body.IsDiscounted,
      DeepestCategoryId = category.ProductCategoryId
    };

    var added = await _repo.Add(newProduct);

    foreach (var bulletPoint in request.Body.BulletPoints)
    {
      await _bulletPointRepo.Add(new ProductBulletPoint()
      {
        ProductBulletPointId = Guid.NewGuid(),
        ProductId = added.ProductId,
        Text = bulletPoint.Text
      });
    }

    foreach (var link in request.Body.ImageLinks)
    {
      await _imageRepo.Add(new ProductImageLink()
      {
        ProductImageLinkId = Guid.NewGuid(),
        ProductId = added.ProductId,
        Link = link.Link
      });
    }

    await _zincService.UpsertProduct(added, request.Body.BulletPoints, request.Body.ImageLinks[0].Link);

    var locationUri = Routes.Products.ProductRoot.Replace(Routes.Products.ProductId, added.ProductId.ToString());

    return Created(locationUri, null);
  }
}