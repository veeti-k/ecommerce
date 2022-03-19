﻿using api.DTOs.Product;
using api.Mapping.MappedTypes;
using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products;

public class CreateProduct : EndpointBaseAsync
  .WithRequest<CreateProductDTO>
  .WithActionResult<ProductCreatedResponse>
{

  private readonly IProductService _productService;

  public CreateProduct(IProductService aProductService)
  {
    _productService = aProductService;
  }

  [Authorize(Policy = Policies.ManageProducts)]
  [HttpPost(Routes.Products.Main)]
  public override async Task<ActionResult<ProductCreatedResponse>> HandleAsync(
    CreateProductDTO dto, 
    CancellationToken cancellationToken = new CancellationToken())
  {
    var createdProduct = await _productService.Create(dto);

    return Ok(createdProduct);
  }
}