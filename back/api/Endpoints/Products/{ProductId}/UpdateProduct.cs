using api.DTOs.Product;
using api.Mapping.MappedTypes;
using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products;

public class UpdateProductRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromBody] public UpdateProductDTO Dto { get; set; }
}

public class UpdateProduct : EndpointBaseAsync
  .WithRequest<UpdateProductRequest>
  .WithActionResult<ProductUpdatedResponse>
{
  private readonly IProductService _productService;

  public UpdateProduct(IProductService aProductService)
  {
    _productService = aProductService;
  }

  [Authorize(Policy = Policies.ManageProducts)]
  [HttpPatch(Routes.Products.Product)]
  public override async Task<ActionResult<ProductUpdatedResponse>> HandleAsync(
    [FromRoute] UpdateProductRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var createdProduct = await _productService.Update(request.Dto, request.ProductId);

    return Ok(createdProduct);
  }
}