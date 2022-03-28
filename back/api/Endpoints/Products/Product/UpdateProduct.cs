﻿using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product;
using api.RequestsAndResponses.Product.Update;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product;


public class UpdateProduct : EndpointBaseAsync
  .WithRequest<UpdateProductRequest>
  .WithActionResult<BaseProductResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Models.Product.Product> _repo;

  public UpdateProduct(IMapper mapper, IGenericRepo<Models.Product.Product> repo)
  {
    _mapper = mapper;
    _repo = repo;
  }

  [Authorize(Policy = Policies.ManageProducts)]
  [HttpPatch(Routes.Products.ProductRoot)]
  public override async Task<ActionResult<BaseProductResponse>> HandleAsync(
    [FromRoute] UpdateProductRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var existingProduct = await _repo.GetById(request.ProductId);
    if (existingProduct is null)
      throw new ProductNotFoundException(request.ProductId);
    
    existingProduct.Name = request.Dto.Name ?? existingProduct.Name;
    existingProduct.Description = request.Dto.Description ?? existingProduct.Description;
    existingProduct.Price = request.Dto.Price ?? existingProduct.Price;
    existingProduct.DiscountedPrice = request.Dto.DiscountedPrice ?? existingProduct.DiscountedPrice;
    existingProduct.DiscountPercent = request.Dto.DiscountPercent ?? existingProduct.DiscountPercent;
    existingProduct.DiscountAmount = request.Dto.DiscountAmount ?? existingProduct.DiscountAmount;
    existingProduct.IsDiscounted = request.Dto.IsDiscounted ?? existingProduct.IsDiscounted;

    var updated = await _repo.Update(existingProduct);

    return Ok(_mapper.Map<BaseProductResponse>(updated));
  }
}