using api.Security;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products;

public class DeleteProduct : EndpointBaseAsync
  .WithRequest<int>
  .WithActionResult
{
  private readonly IProductService _productService;

  public DeleteProduct(IProductService aProductService)
  {
    _productService = aProductService;
  }

  [Authorize(Policy = CrucialStrings.ManageProducts)]
  [HttpDelete(Routes.Products.Product)]
  public override async Task<ActionResult> HandleAsync(
    int productId, 
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _productService.Remove(productId);

    return NoContent();
  }
}