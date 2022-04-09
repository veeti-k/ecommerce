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
  private readonly ICategoryRepo _categoryRepo;

  public RemoveCategory(ICategoryRepo categoryRepo)
  {
    _categoryRepo = categoryRepo;
  }

  [Authorize(Policy = Policies.ManageCategories)]
  [HttpDelete(Routes.Categories.CategoryRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] RemoveCategoryRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var categoryToDelete = await _categoryRepo.GetById(request.CategoryId);
    if (categoryToDelete is null) throw new ProductCategoryNotFoundException(request.CategoryId);

    await _categoryRepo.Delete(categoryToDelete);

    var children = await _categoryRepo.GetByParentId(categoryToDelete.Id);
    foreach (var child in children)
    {
      child.ParentId = null;

      await _categoryRepo.Update(child);
    }

    return NoContent();
  }
}