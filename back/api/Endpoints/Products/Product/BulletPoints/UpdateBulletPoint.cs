using api.Exceptions;
using api.Models.Product;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductBulletPoints;
using api.RequestsAndResponses.ProductBulletPoints.Update;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.BulletPoints;

public class UpdateBulletPoint : EndpointBaseAsync
  .WithRequest<UpdateBulletPointRequest>
  .WithActionResult<ProductBulletPointResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Models.Product.Product> _productRepo;
  private readonly IGenericRepo<ProductBulletPoint> _productBulletPointRepo;

  public UpdateBulletPoint(
    IMapper mapper,
    IGenericRepo<Models.Product.Product> productRepo,
    IGenericRepo<ProductBulletPoint> productBulletPointRepo)
  {
    _mapper = mapper;
    _productRepo = productRepo;
    _productBulletPointRepo = productBulletPointRepo;
  }

  [Authorize(Policy = Policies.ManageProducts)]
  [HttpPatch(Routes.Products.Product.BulletPoints.BulletPoint)]
  public override async Task<ActionResult<ProductBulletPointResponse>> HandleAsync(
    [FromRoute] UpdateBulletPointRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var bulletPoint = await _productBulletPointRepo.GetById(request.BulletPointId);
    if (bulletPoint is null) throw new ProductBulletPointNotFoundException(request.BulletPointId);
    
    bulletPoint.Text = request.Dto.Text ?? bulletPoint.Text;
    bulletPoint.IsImportant = request.Dto.IsImportant ?? bulletPoint.IsImportant;

    var updated = await _productBulletPointRepo.Update(bulletPoint);
    return _mapper.Map<ProductBulletPointResponse>(updated);
  }
}