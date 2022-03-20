using api.Mapping.MappedTypes.Product;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product;

public class GetProduct : EndpointBaseAsync
  .WithRequest<int>
  .WithActionResult<ProductResponse>
{
  private readonly IProductService _productService;

  public GetProduct(IProductService aProductService)
  {
    _productService = aProductService;
  }

  [HttpGet(Routes.Products.ProductRoot)]
  public override async Task<ActionResult<ProductResponse>> HandleAsync(
    int productId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var products = await _productService.GetById(productId);

    return Ok(products);
  }
}