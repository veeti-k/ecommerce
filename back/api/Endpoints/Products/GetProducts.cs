using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products;

public class GetProducts : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<IEnumerable<ShowCaseProductResponse>>
{
  private readonly IMapper _mapper;
  private readonly IProductRepo _repo;

  public GetProducts(IMapper mapper, IProductRepo repo)
  {
    _mapper = mapper;
    _repo = repo;
  }

  [HttpGet(Routes.ProductsRoot)]
  public override async Task<ActionResult<IEnumerable<ShowCaseProductResponse>>> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var products = await _repo.GetManyNotDeletedWithBulletPoints();
    return Ok(_mapper.Map<IEnumerable<ShowCaseProductResponse>>(products));
  }
}