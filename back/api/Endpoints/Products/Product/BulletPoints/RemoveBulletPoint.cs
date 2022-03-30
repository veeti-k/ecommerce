using api.Exceptions;
using api.Models.Product;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductBulletPoints.Delete;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.BulletPoints;

public class RemoveBulletPoint : EndpointBaseAsync
  .WithRequest<RemoveBulletPointRequest>
  .WithActionResult
{
  private readonly IProductRepo _productRepo;
  private readonly IGenericRepo<ProductBulletPoint> _productBulletPointRepo;

  public RemoveBulletPoint(
    IProductRepo productRepo,
    IGenericRepo<ProductBulletPoint> productBulletPointRepo)
  {
    _productRepo = productRepo;
    _productBulletPointRepo = productBulletPointRepo;
  }

  [HttpDelete(Routes.Products.Product.BulletPoints.BulletPoint)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] RemoveBulletPointRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var bulletPoint = await _productBulletPointRepo.GetById(request.BulletPointId);
    if (bulletPoint is null) throw new ProductBulletPointNotFoundException(request.BulletPointId);

    await _productBulletPointRepo.Delete(bulletPoint);
    return NoContent();
  }
}