using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Category;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Categories;

public class GetCategory : EndpointBaseAsync
  .WithRequest<GetCategoryRequest>
  .WithActionResult<ResolvedCategory>
{
  private readonly ICategoryRepo _categoryRepo;

  public GetCategory(ICategoryRepo categoryRepo)
  {
    _categoryRepo = categoryRepo;
  }

  [HttpGet(Routes.Categories.CategoryRoot)]
  public override async Task<ActionResult<ResolvedCategory>> HandleAsync(
    [FromRoute] GetCategoryRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var categories = await _categoryRepo.GetAll();

    var category = categories.FirstOrDefault(c => c.ProductCategoryId == request.CategoryId);
    if (category is null) throw new ProductCategoryNotFoundException(request.CategoryId);

    var resolved = Utils.Categories.ResolveCategory(categories, category);

    return Ok(resolved);
  }
}