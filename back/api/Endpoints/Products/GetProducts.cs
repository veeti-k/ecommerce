using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product;
using api.Utils;
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
  .WithActionResult<List<ProductResponse>>
{
  private readonly IMapper _mapper;
  private readonly IProductRepo _productRepo;

  public GetProducts(IMapper mapper, IProductRepo productRepo)
  {
    _mapper = mapper;
    _productRepo = productRepo;
  }

  [HttpGet(Routes.ProductsRoot)]
  public override async Task<ActionResult<List<ProductResponse>>> HandleAsync(
    [FromRoute] GetProductsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    List<Models.Product> products = new List<Models.Product>() { };

    products = await _productRepo.Search(request.Query, request.Category);

    if (request.Query is not null)
      products = SearchUtils.OrderByNameStartsWith(products, request.Query);

    return Ok(_mapper.Map<List<ProductResponse>>(products));
  }
}