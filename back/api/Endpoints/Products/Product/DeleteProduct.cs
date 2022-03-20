using api.Security.Policies;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product;

public class DeleteProduct : EndpointBaseAsync
  .WithRequest<int>
  .WithActionResult
{
  private readonly IProductService _productService;

  public DeleteProduct(IProductService aProductService)
  {
    _productService = aProductService;
  }

  [Authorize(Policy = Policies.ManageProducts)]
  [HttpDelete(Routes.Products.ProductRoot)]
  public override async Task<ActionResult> HandleAsync(
    int productId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _productService.Remove(productId);

    return NoContent();
  }
}