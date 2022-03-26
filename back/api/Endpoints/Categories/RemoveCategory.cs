using api.Exceptions;
using api.Models.Product;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Category;
using api.Security.Policies;
using api.Specifications.Category;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Categories;

public class RemoveCategory : EndpointBaseAsync
  .WithRequest<RemoveCategoryRequest>
  .WithActionResult

{
  private readonly IGenericRepo<ProductCategory> _repo;

  public RemoveCategory(IGenericRepo<ProductCategory> repo)
  {
    _repo = repo;
  }
  
  [Authorize(Policy = Policies.Administrator)]
  [HttpDelete(Routes.Categories.Category)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] RemoveCategoryRequest request, 
    CancellationToken cancellationToken = new CancellationToken())
  {
    var categoryToDelete = await _repo
      .Specify(new CategoryGetWithIdSpec(request.CategoryId))
      .FirstOrDefaultAsync(cancellationToken);
    
    if (categoryToDelete is null) throw new NotFoundException($"Category with id {request.CategoryId} not found");

    await _repo.Delete(categoryToDelete);

    return NoContent();
  }
}