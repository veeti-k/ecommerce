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
    var products = new List<Models.Product?>();

    if (request.Query is null)
    {
      products = await _productRepo.GetManyNotDeleted();
    }
    else
    {
      var res = await _productRepo.Search(request.Query);
      if (res.Any()) products = SearchUtils.OrderByNameStartsWith(res, request.Query);
    }

    return Ok(_mapper.Map<List<ProductResponse>>(products));
  }
}