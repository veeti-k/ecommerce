using api.Exceptions;
using api.Models.Product;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Category;
using api.Security.Policies;
using api.Specifications.Category;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Categories;

public class UpdateCategory : EndpointBaseAsync
  .WithRequest<UpdateCategoryRequest>
  .WithActionResult<ProductCategoryResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<ProductCategory> _repo;
 
  public UpdateCategory(IMapper mapper, IGenericRepo<ProductCategory> repo)
  {
    _mapper = mapper;
    _repo = repo;
  }

  [Authorize(Policy = Policies.Administrator)]
  [HttpPatch(Routes.Categories.Category)]
  public override async Task<ActionResult<ProductCategoryResponse>> HandleAsync(
    [FromRoute] UpdateCategoryRequest request, 
    CancellationToken cancellationToken = new CancellationToken())
  {
    var existingCategory = await _repo
      .Specify(new CategoryGetWithIdSpec(request.CategoryId))
      .FirstOrDefaultAsync(cancellationToken);

    if (existingCategory is null) 
      throw new NotFoundException($"Category with id {request.CategoryId} not found");

    existingCategory.Name = request.Dto.Name ?? existingCategory.Name;
    existingCategory.ParentId = request.Dto.ParentId ?? existingCategory.ParentId;

    var updated =  await _repo.Update(existingCategory);

    return Ok(_mapper.Map<ProductCategoryResponse>(updated));
  }
}