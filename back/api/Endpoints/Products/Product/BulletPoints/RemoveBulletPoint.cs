using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.BulletPoints;

public class RemoveBulletPointRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "bulletPointId")] public Guid BulletPointId { get; set; }
}

public class RemoveBulletPoint : EndpointBaseAsync
  .WithRequest<RemoveBulletPointRequest>
  .WithActionResult
{
  private readonly IProductBulletPointService _productBulletPointService;

  public RemoveBulletPoint(IProductBulletPointService aProductBulletPointService)
  {
    _productBulletPointService = aProductBulletPointService;
  }

  [HttpDelete(Routes.Products.Product.BulletPoints.BulletPoint)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] RemoveBulletPointRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _productBulletPointService.Remove(request.BulletPointId, request.ProductId);

    return NoContent();
  }
}