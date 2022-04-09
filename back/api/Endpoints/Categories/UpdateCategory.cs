using api.Exceptions;
using api.Models;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Category;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Categories;

public class UpdateCategory : EndpointBaseAsync
  .WithRequest<UpdateCategoryRequest>
  .WithActionResult<ProductCategory>
{
  private readonly IGenericRepo<ProductCategory> _categoryRepo;

  public UpdateCategory(IGenericRepo<ProductCategory> categoryRepo)
  {
    _categoryRepo = categoryRepo;
  }

  [Authorize(Policy = Policies.ManageCategories)]
  [HttpPatch(Routes.Categories.CategoryRoot)]
  public override async Task<ActionResult<ProductCategory>> HandleAsync(
    [FromRoute] UpdateCategoryRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var existingCategory = await _categoryRepo.GetById(request.CategoryId);
    if (existingCategory is null) throw new ProductCategoryNotFoundException(request.CategoryId);

    if (existingCategory.Id == request.Dto.ParentId)
      throw new BadRequestException("Parent category cannot be the same as the category itself");

    if (request.Dto.ParentId != null)
    {
      var parentCategory = await _categoryRepo.GetById(request.Dto.ParentId.Value);
      if (parentCategory is null) throw new ProductCategoryNotFoundException(request.Dto.ParentId.Value);
    }

    existingCategory.Name = request.Dto.Name ?? existingCategory.Name;
    existingCategory.ParentId = request.Dto.ParentId ?? existingCategory.ParentId;

    var updated = await _categoryRepo.Update(existingCategory);

    return Ok(updated);
  }
}