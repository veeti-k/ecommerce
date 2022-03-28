using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product.Delete;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product;

public class DeleteProduct : EndpointBaseAsync
  .WithRequest<DeleteProductRequest>
  .WithActionResult
{
  private readonly IGenericRepo<Models.Product.Product> _repo;

  public DeleteProduct(IGenericRepo<Models.Product.Product> repo)
  {
    _repo = repo;
  }

  [Authorize(Policy = Policies.ManageProducts)]
  [HttpDelete(Routes.Products.ProductRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] DeleteProductRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _repo.GetById(request.ProductId);
    if (product is null)
      throw new ProductNotFoundException(request.ProductId);

    await _repo.Delete(product);
    return NoContent();
  }
}