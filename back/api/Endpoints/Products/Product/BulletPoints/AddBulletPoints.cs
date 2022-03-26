﻿using api.Exceptions;
using api.Models.Product;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductBulletPoints;
using api.RequestsAndResponses.ProductBulletPoints.Add;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.BulletPoints;

public class AddBulletPoints : EndpointBaseAsync
  .WithRequest<AddBulletPointsRequest>
  .WithActionResult<IEnumerable<ProductBulletPointResponse>>
{
  private readonly IGenericRepo<Models.Product.Product> _productRepo;
  private readonly IGenericRepo<ProductBulletPoint> _productBulletPointRepo;

  public AddBulletPoints(
    IGenericRepo<Models.Product.Product> productRepo,
    IGenericRepo<ProductBulletPoint> productBulletPointRepo)
  {
    _productRepo = productRepo;
    _productBulletPointRepo = productBulletPointRepo;
  }

  [Authorize(Policy = Policies.ManageProducts)]
  [HttpPost(Routes.Products.Product.BulletPointsRoot)]
  public override async Task<ActionResult<IEnumerable<ProductBulletPointResponse>>> HandleAsync(
    [FromRoute] AddBulletPointsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new NotFoundException($"Product with id {request.ProductId} was not found");

    foreach (var bulletPoint in request.Dto.BulletPoints)
    {
      var newBulletPoint = new ProductBulletPoint()
      {
        Text = bulletPoint.Text,
        IsImportant = bulletPoint.IsImportant,
        ProductId = product.Id
      };

      await _productBulletPointRepo.Add(newBulletPoint);
    }

    return NoContent();
  }
}