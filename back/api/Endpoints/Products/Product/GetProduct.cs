using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product;
using api.RequestsAndResponses.Product.GetOne;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product;

public class GetProduct : EndpointBaseAsync
  .WithRequest<GetOneRequest>
  .WithActionResult<ProductPageProductResponse>
{
  private readonly IMapper _mapper;
  private readonly IProductRepo _productRepo;

  public GetProduct(IMapper mapper, IProductRepo productRepo)
  {
    _mapper = mapper;
    _productRepo = productRepo;
  }

  [HttpGet(Routes.Products.ProductRoot)]
  public override async Task<ActionResult<ProductPageProductResponse>> HandleAsync(
    [FromRoute] GetOneRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetOneNotDeletedWithBulletPointsAndCategories(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    return Ok(_mapper.Map<ProductPageProductResponse>(product));
  }
}