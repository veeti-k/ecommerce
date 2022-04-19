using api.Models;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Category;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Categories;

public class GetCategories : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<List<ProductCategoryResponse>>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<ProductCategory> _categoryRepo;

  public GetCategories(IGenericRepo<ProductCategory> categoryRepo, IMapper mapper)
  {
    _categoryRepo = categoryRepo;
    _mapper = mapper;
  }

  [HttpGet(Routes.CategoriesRoot)]
  public override async Task<ActionResult<List<ProductCategoryResponse>>> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var categories = await _categoryRepo.GetAll();

    var resolvedCategories = Utils.Categories.ResolveCategories(categories);

    return Ok(new ProductCategoryResponse()
      {AllCategories = _mapper.Map<List<CategoryResponse>>(categories), ResolvedCategories = resolvedCategories});
  }
}