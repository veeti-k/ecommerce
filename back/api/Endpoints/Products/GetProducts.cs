using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product;
using api.Specifications.Product;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Products;

public class GetProducts : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<IEnumerable<ShowCaseProductResponse>>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Models.Product.Product> _repo;

  public GetProducts(IMapper mapper, IGenericRepo<Models.Product.Product> repo)
  {
    _mapper = mapper;
    _repo = repo;
  }

  [HttpGet(Routes.ProductsRoot)]
  public override async Task<ActionResult<IEnumerable<ShowCaseProductResponse>>> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var products = await _repo
      .Specify(new ProductGetAllSpec())
      .ToListAsync(cancellationToken);
      
    return Ok(_mapper.Map<IEnumerable<ShowCaseProductResponse>>(products));
  }
}