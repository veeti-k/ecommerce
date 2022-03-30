using api.Exceptions;
using api.Models.Product;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Category;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Categories;

public class RemoveCategory : EndpointBaseAsync
  .WithRequest<RemoveCategoryRequest>
  .WithActionResult

{
  private readonly IGenericRepo<ProductCategory> _categoryRepo;

  public RemoveCategory(IGenericRepo<ProductCategory> categoryRepo)
  {
    _categoryRepo = categoryRepo;
  }
  
  [Authorize(Policy = Policies.Administrator)]
  [HttpDelete(Routes.Categories.Category)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] RemoveCategoryRequest request, 
    CancellationToken cancellationToken = new CancellationToken())
  {
    var categoryToDelete = await _categoryRepo.GetById(request.CategoryId);
    if (categoryToDelete is null) throw new ProductCategoryNotFoundException(request.CategoryId);

    await _categoryRepo.Delete(categoryToDelete);

    return NoContent();
  }
}