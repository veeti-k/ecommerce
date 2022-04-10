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
  private readonly IValidator<AddProductDto> _validator;

  public AddProduct(
    IProductRepo repo,
    IGenericRepo<ProductImageLink> imageRepo,
    IGenericRepo<ProductBulletPoint> bulletPointRepo,
    IGenericRepo<ProductsCategories> pcRepo,
    ICategoryRepo categoryRepo, IValidator<AddProductDto> validator)
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
    var validationResult = await _validator.ValidateAsync(request.Dto, cancellationToken);
    if (!validationResult.IsValid) throw new BadRequestException(validationResult.ToString());

    var category = await _categoryRepo.GetById(request.Dto.DeepestCategoryId);
    if (category is null) throw new ProductCategoryNotFoundException(request.Dto.DeepestCategoryId);
    
    var newProduct = new Models.Product
    {
      Name = request.Dto.Name,
      Description = request.Dto.Description,
      Price = request.Dto.Price,
      DiscountAmount = request.Dto.DiscountAmount,
      DiscountedPrice = request.Dto.DiscountedPrice,
      DiscountPercent = request.Dto.DiscountPercent,
      IsDiscounted = request.Dto.IsDiscounted,
      DeepestCategoryId = category.Id
    };

    var added = await _repo.Add(newProduct);

    foreach (var bulletPoint in request.Dto.BulletPoints)
    {
      await _bulletPointRepo.Add(new ProductBulletPoint()
      {
        BulletPointId = Guid.NewGuid(),
        ProductId = added.Id,
        Text = bulletPoint.Text
      });
    }

    foreach (var link in request.Dto.ImageLinks)
    {
      await _imageRepo.Add(new ProductImageLink()
      {
        ProductImageLinkId = Guid.NewGuid(),
        ProductId = added.Id,
        Link = link.Link
      });
    }

    var allCategories = await _categoryRepo.GetAll();

    var path = Utils.Categories.GetCategoryPath(allCategories, request.Dto.DeepestCategoryId);

    foreach (var pathCategory in path)
    {
      await _pcRepo.Add(new ProductsCategories()
      {
        ProductId = added.Id,
        CategoryId = pathCategory.Id
      });
    }

    var locationUri = Routes.Products.ProductRoot.Replace(Routes.Products.ProductId, added.Id.ToString());

    return Created(locationUri, null);
  }
}