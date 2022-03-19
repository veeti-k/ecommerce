﻿using api.Mapping.MappedTypes;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products;

public class GetProduct : EndpointBaseAsync
  .WithRequest<int>
  .WithActionResult<ProductPageProductResponse>
{
  private readonly IProductService _productService;

  public GetProduct(IProductService aProductService)
  {
    _productService = aProductService;
  }

  [HttpGet(Routes.Products.Product)]
  public override async Task<ActionResult<ProductPageProductResponse>> HandleAsync(
    int productId, 
    CancellationToken cancellationToken = new CancellationToken())
  {
    var products = await _productService.GetOneProductPageProduct(productId);

    return Ok(products);
  }
}