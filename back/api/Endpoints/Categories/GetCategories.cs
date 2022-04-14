using System.Collections.ObjectModel;
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

    var resolvedCategories = new List<ResolvedCategory>();
    var mappedCategories = _mapper.Map<List<ResolvedCategory>>(categories);

    foreach (var category in mappedCategories)
    {
      if (category.ParentId is not null)
      {
        var parent = mappedCategories.FirstOrDefault(c => c.Id == category.ParentId);
        if (parent == null) continue;

        parent.Children ??= new List<ResolvedCategory>();
        parent.Children.Add(category);
      }
      else
      {
        resolvedCategories.Add(category);
      }
    }

    return Ok(new ProductCategoryResponse()
      {AllCategories = _mapper.Map<List<CategoryResponse>>(categories), ResolvedCategories = resolvedCategories});
  }
}