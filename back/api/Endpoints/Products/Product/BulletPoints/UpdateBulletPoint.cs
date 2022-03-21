using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;
using api.Security.Policies;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.BulletPoints;

public class UpdateBulletPointRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "bulletPointId")] public Guid BulletPointId { get; set; }
  [FromBody] public UpdateProductBulletPointDTO Dto { get; set; }
}

public class UpdateBulletPoint : EndpointBaseAsync
  .WithRequest<UpdateBulletPointRequest>
  .WithActionResult<ProductBulletPointResponse>
{
  private readonly IProductBulletPointService _productBulletPointService;

  public UpdateBulletPoint(IProductBulletPointService aProductBulletPointService)
  {
    _productBulletPointService = aProductBulletPointService;
  }

  [Authorize(Policy = Policies.ManageProducts)]
  [HttpPatch(Routes.Products.Product.BulletPoints.BulletPoint)]
  public override async Task<ActionResult<ProductBulletPointResponse>> HandleAsync(
    [FromRoute] UpdateBulletPointRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var updated = await _productBulletPointService
      .Update(request.Dto, request.BulletPointId, request.ProductId);

    return Ok(updated);
  }
}