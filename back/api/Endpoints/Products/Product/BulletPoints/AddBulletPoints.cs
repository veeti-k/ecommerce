using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;
using api.Security.Policies;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.BulletPoints;

public class AddBulletPointsRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromBody] public CreateProductBulletPointDTO Dto { get; set; }
}

public class AddBulletPoints : EndpointBaseAsync
  .WithRequest<AddBulletPointsRequest>
  .WithActionResult<IEnumerable<ProductBulletPointResponse>>
{
  private readonly IProductBulletPointService _productBulletPointService;

  public AddBulletPoints(IProductBulletPointService aProductBulletPointService)
  {
    _productBulletPointService = aProductBulletPointService;
  }

  [Authorize(Policy = Policies.ManageProducts)]
  [HttpPost(Routes.Products.Product.BulletPointsRoot)]
  public override async Task<ActionResult<IEnumerable<ProductBulletPointResponse>>> HandleAsync(
    [FromRoute] AddBulletPointsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var added = await _productBulletPointService
      .CreateMany(request.Dto, request.ProductId);

    return Created("", added);
  }
}