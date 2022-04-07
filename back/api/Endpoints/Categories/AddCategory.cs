using api.Models.Product;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Category;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Categories;

public class AddCategory : EndpointBaseAsync
  .WithRequest<AddCategoryRequest>
  .WithActionResult
{
  private readonly IGenericRepo<ProductCategory> _repo;

  public AddCategory(
    IGenericRepo<ProductCategory> repo)
  {
    _repo = repo;
  }

  [Authorize(Policy = Policies.ManageCategories)]
  [HttpPost(Routes.CategoriesRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] AddCategoryRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    ProductCategory newCategory = new()
    {
      Name = request.Dto.Name,
      ParentId = request.Dto.ParentId
    };

    var added = await _repo.Add(newCategory);
    
    var locationUri = Routes.Categories.Category.Replace(Routes.Categories.CategoryId, added.Id.ToString());

    return Created(locationUri, null);
  }
}