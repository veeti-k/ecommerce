using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product;
using api.Services;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products;

public record GetProductsRequest
{
  [FromQuery(Name = "query")] public string? Query { get; init; }
  [FromQuery(Name = "category")] public int? Category { get; init; }
}

public class GetProducts : EndpointBaseAsync
  .WithRequest<GetProductsRequest>
  .WithActionResult<List<ZincProduct>>
{
  private readonly IMapper _mapper;
  private readonly ICategoryRepo _categoryRepo;
  private readonly IZincService _zincService;

  public GetProducts(IMapper mapper, ICategoryRepo categoryRepo, IZincService zincService)
  {
    _mapper = mapper;
    _categoryRepo = categoryRepo;
    _zincService = zincService;
  }

  [HttpGet(Routes.ProductsRoot)]
  public override async Task<ActionResult<List<ZincProduct>>> HandleAsync(
    [FromRoute] GetProductsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    IEnumerable<ZincProduct> products = new List<ZincProduct>() { };

    if (request.Query is null && request.Category is null)
    {
      Console.WriteLine("both null");
      return Ok(products);
    }

    if (request.Query is not null && request.Category is null)
    {
      Console.WriteLine("query not null, category null");

      products = await _zincService.SearchWithString(request.Query);

      return Ok(products);
    }

    if (request.Category is not null && request.Query is null)
    {
      Console.WriteLine("query null, category is not null");

      var allCategories = await _categoryRepo.GetAll();

      var childCategories = Utils.Categories.GetAllChildCategories(allCategories, request.Category.Value);
      var childIds = childCategories.Select(x => x.ProductCategoryId);

      products = await _zincService.SearchWithCategoryIds(childIds);
      return Ok(_mapper.Map<List<ShowCaseProductResponse>>(products));
    }

    return Ok(products);
  }
}