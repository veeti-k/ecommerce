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

public class AddCategory : EndpointBaseAsync
  .WithRequest<AddCategoryRequest>
  .WithActionResult<ProductCategoryResponse>

{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<ProductCategory> _repo;

  public AddCategory(
    IMapper mapper,
    IGenericRepo<ProductCategory> repo)
  {
    _mapper = mapper;
    _repo = repo;
  }

  [Authorize(Policy = Policies.Administrator)]
  [HttpPost(Routes.CategoriesRoot)]
  public override async Task<ActionResult<ProductCategoryResponse>> HandleAsync(
    [FromRoute] AddCategoryRequest request, 
    CancellationToken cancellationToken = new CancellationToken())
  {
    var existing = await _repo
      .Specify(new CategoryGetWithNameSpec(request.Dto.Name))
      .FirstOrDefaultAsync(cancellationToken);
    
    if (existing is not null)
      throw new BadRequestException($"Category with name {request.Dto.Name} already exists");

    ProductCategory newCategory = new()
    {
      Name = request.Dto.Name,
      ParentId = request.Dto.ParentId | null
    };

    var added = await _repo.Add(newCategory);

    return Created("",added);
  }
}