using api.Exceptions;
using api.Models;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Category;
using api.RequestsAndResponses.Product.Update;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Categories;

public class UpdateCategory : EndpointBaseAsync
  .WithRequest<UpdateCategoryRequest>
  .WithActionResult<ProductCategory>
{
  private readonly IGenericRepo<ProductCategory> _categoryRepo;
  private readonly IValidator<UpdateCategoryRequest> _validator;

  public UpdateCategory(IGenericRepo<ProductCategory> categoryRepo, IValidator<UpdateCategoryRequest> validator)
  {
    _categoryRepo = categoryRepo;
    _validator = validator;
  }

  [Authorize(Policy = Policies.ManageCategories)]
  [HttpPatch(Routes.Categories.CategoryRoot)]
  public override async Task<ActionResult<ProductCategory>> HandleAsync(
    [FromRoute] UpdateCategoryRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var validationResult = await _validator.ValidateAsync(request, cancellationToken);
    if (!validationResult.IsValid) throw new BadRequestException(validationResult.ToString());

    var existingCategory = await _categoryRepo.GetById(request.CategoryId);
    if (existingCategory is null) throw new ProductCategoryNotFoundException(request.CategoryId);

    if (existingCategory.ProductCategoryId == request.Dto.ParentId)
      throw new BadRequestException("Parent category cannot be the same as the category itself");

    if (request.Dto.ParentId is not null)
    {
      var newParent = await _categoryRepo.GetById(request.Dto.ParentId.Value);
      if (newParent is null) throw new ProductCategoryNotFoundException(request.Dto.ParentId.Value);
      
      if (newParent.ParentId == existingCategory.ProductCategoryId)
        throw new BadRequestException($"{newParent.Name} is already a child of {existingCategory.Name}");
    }

    existingCategory.Name = request.Dto.Name;
    existingCategory.ParentId = request.Dto.ParentId;

    var updated = await _categoryRepo.Update(existingCategory);

    return Ok(updated);
  }
}