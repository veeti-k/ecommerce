using api.Repositories.Interfaces;
using api.RequestsAndResponses.Stores;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Stores;

public class GetStores : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<List<StoreResponse>>
{
  private readonly IStoreRepo _storeRepository;

  public GetStores(IStoreRepo storeRepository)
  {
    _storeRepository = storeRepository;
  }

  [HttpGet(Routes.StoresRoot)]
  public override async Task<ActionResult<List<StoreResponse>>> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var stores = await _storeRepository.GetManyStores();

    return Ok(stores);
  }
}