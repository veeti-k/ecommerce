using api.Exceptions;
using api.Models.Product;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product;
using api.RequestsAndResponses.Product.Update;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product;

public class UpdateProduct : EndpointBaseAsync
  .WithRequest<UpdateProductRequest>
  .WithActionResult
{
  private readonly IMapper _mapper;
  private readonly IProductRepo _productRepo;
  private readonly IProductsCategoriesRepo _pcRepo;
  private readonly ICategoryRepo _productCategoryRepo;
  private readonly IValidator<UpdateProductDto> _validator;

  public UpdateProduct(
    IMapper mapper,
    IProductRepo productRepo,
    IProductsCategoriesRepo pcRepo,
    ICategoryRepo productCategoryRepo,
    IValidator<UpdateProductDto> validator)
  {
    _mapper = mapper;
    _productRepo = productRepo;
    _pcRepo = pcRepo;
    _productCategoryRepo = productCategoryRepo;
    _validator = validator;
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

    existingProduct.Name = request.Dto.Name ?? existingProduct.Name;
    existingProduct.Description = request.Dto.Description ?? existingProduct.Description;
    existingProduct.Price = request.Dto.Price ?? existingProduct.Price;
    existingProduct.DiscountedPrice = request.Dto.DiscountedPrice ?? existingProduct.DiscountedPrice;
    existingProduct.DiscountPercent = request.Dto.DiscountPercent ?? existingProduct.DiscountPercent;
    existingProduct.DiscountAmount = request.Dto.DiscountAmount ?? existingProduct.DiscountAmount;
    existingProduct.IsDiscounted = request.Dto.IsDiscounted ?? existingProduct.IsDiscounted;

    await _productRepo.Update(existingProduct);

    if (request.Dto.CategoryId == null && request.Dto.CategoryId == existingProduct.DeepestCategoryId)
      return Ok();

    var oldCategories = await _pcRepo.GetManyByProductId(existingProduct.Id);
    await _pcRepo.DeleteMany(oldCategories);

    var allCategories = await _productCategoryRepo.GetAll();

    var currentCategory = allCategories.FirstOrDefault(c => c.Id == request.Dto.CategoryId);
    var path = new List<ProductCategory>() {currentCategory};

    var lookForParent = allCategories.Any();
    while (lookForParent)
    {
      var parent = allCategories
        .FirstOrDefault(c => c.Id == currentCategory.ParentId);

      if (parent == null)
      {
        lookForParent = false;
        continue;
      }

      path.Add(parent);

      currentCategory = parent;
    }

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