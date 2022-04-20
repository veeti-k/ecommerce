using api.Repositories.Interfaces;
using api.RequestsAndResponses.Category;
using api.RequestsAndResponses.Category.GetCategoriesToId;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Categories;

public class GetCategoriesToId : EndpointBaseAsync
  .WithRequest<GetCategoriesToIdRequest>
  .WithActionResult<GetCategoriesToIdResponse>
{
  private readonly IMapper _mapper;
  private readonly ICategoryRepo _categoryRepo;

  public GetCategoriesToId(IMapper mapper, ICategoryRepo categoryRepo)
  {
    _mapper = mapper;
    _categoryRepo = categoryRepo;
  }

  [HttpGet(Routes.Categories.ToCategory)]
  public override async Task<ActionResult<GetCategoriesToIdResponse>> HandleAsync(
    [FromRoute] GetCategoriesToIdRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var categories = await _categoryRepo.GetAll();

    var ids = Utils.Categories.GetRelevantCategoryIds(categories, request.CategoryId);

    return Ok(new GetCategoriesToIdResponse()
    {
      Categories =
        _mapper.Map<List<CategoryResponse>>(categories.Where(c => ids.Contains(c.ProductCategoryId)).ToList()),
      CategoryIds = ids
    });
  }
}