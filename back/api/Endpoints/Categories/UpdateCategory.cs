using api.Exceptions;
using api.Models.Product;
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
  .WithActionResult<ProductCategoryResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<ProductCategory> _categoryRepo;

  public UpdateCategory(IMapper mapper, IGenericRepo<ProductCategory> categoryRepo)
  {
    _mapper = mapper;
    _categoryRepo = categoryRepo;
  }

  [Authorize(Policy = Policies.Administrator)]
  [HttpPatch(Routes.Categories.Category)]
  public override async Task<ActionResult<ProductCategoryResponse>> HandleAsync(
    [FromRoute] UpdateCategoryRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var existingCategory = await _categoryRepo.GetById(request.CategoryId);
    if (existingCategory is null) throw new ProductCategoryNotFoundException(request.CategoryId);

    existingCategory.Name = request.Dto.Name ?? existingCategory.Name;
    existingCategory.ParentId = request.Dto.ParentId ?? existingCategory.ParentId;

    var updated = await _categoryRepo.Update(existingCategory);

    return Ok(_mapper.Map<ProductCategoryResponse>(updated));
  }
}