using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product;
using api.RequestsAndResponses.Product.GetOne;
using api.Specifications.Product;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Products.Product;

public class GetProduct : EndpointBaseAsync
  .WithRequest<GetOneRequest>
  .WithActionResult<ProductPageProductResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Models.Product.Product> _repo;

  public GetProduct(IMapper mapper, IGenericRepo<Models.Product.Product> repo)
  {
    _mapper = mapper;
    _repo = repo;
  }

  [HttpGet(Routes.Products.ProductRoot)]
  public override async Task<ActionResult<ProductPageProductResponse>> HandleAsync(
    [FromRoute] GetOneRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _repo
      .Specify(new ProductGetProductPageProductSpec(request.ProductId))
      .FirstOrDefaultAsync(cancellationToken);

    if (product is null) throw new NotFoundException($"Product with id {request.ProductId} not found");
    
    return Ok(_mapper.Map<ProductPageProductResponse>(product));
  }
}