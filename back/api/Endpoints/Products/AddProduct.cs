using api.Exceptions;
using api.Models;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product.Add;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products;

public class AddProduct : EndpointBaseAsync
  .WithRequest<AddProductRequest>
  .WithActionResult
{
  private readonly IProductRepo _repo;
  private readonly IGenericRepo<ProductImageLink> _imageRepo;
  private readonly IGenericRepo<ProductBulletPoint> _bulletPointRepo;
  private readonly IGenericRepo<ProductsCategories> _pcRepo;
  private readonly ICategoryRepo _categoryRepo;
  private readonly IValidator<AddProductRequest> _validator;

  public AddProduct(
    IProductRepo repo,
    IGenericRepo<ProductImageLink> imageRepo,
    IGenericRepo<ProductBulletPoint> bulletPointRepo,
    IGenericRepo<ProductsCategories> pcRepo,
    ICategoryRepo categoryRepo, IValidator<AddProductRequest> validator)
  {
    _repo = repo;
    _imageRepo = imageRepo;
    _bulletPointRepo = bulletPointRepo;
    _pcRepo = pcRepo;
    _categoryRepo = categoryRepo;
    _validator = validator;
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

    var allCategories = await _categoryRepo.GetAll();

    var path = Utils.Categories.GetCategoryPath(allCategories, request.Body.DeepestCategoryId);

    foreach (var pathCategory in path)
    {
      await _pcRepo.Add(new ProductsCategories()
      {
        ProductId = added.ProductId,
        ProductCategoryId = pathCategory.ProductCategoryId
      });
    }

    var locationUri = Routes.Products.ProductRoot.Replace(Routes.Products.ProductId, added.ProductId.ToString());

    return Created(locationUri, null);
  }
}