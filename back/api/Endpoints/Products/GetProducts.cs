using api.Mapping.MappedTypes.Product;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products;

public class GetProducts : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<IEnumerable<ShowCaseProductResponse>>
{
  private readonly IProductService _productService;

  public GetProducts(IProductService aProductService)
  {
    _productService = aProductService;
  }

  [HttpGet(Routes.ProductsRoot)]
  public override async Task<ActionResult<IEnumerable<ShowCaseProductResponse>>> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var products = await _productService.GetAll();

    return Ok(products);
  }
}