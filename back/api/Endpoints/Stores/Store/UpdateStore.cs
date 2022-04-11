using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Stores;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Stores.Store;

public class UpdateStore : EndpointBaseAsync
  .WithRequest<UpdateStoreRequest>
  .WithActionResult
{
  private readonly IGenericRepo<Models.Store> _storeRepo;

  public UpdateStore(IGenericRepo<Models.Store> storeRepo)
  {
    _storeRepo = storeRepo;
  }

  [Authorize(Policy = Policies.ManageStores)]
  [HttpPatch(Routes.Stores.StoreRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] UpdateStoreRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var existingStore = await _storeRepo.GetById(request.StoreId);
    if (existingStore is null) throw new StoreNotFoundException(request.StoreId);

    existingStore.Name = request.Dto.Name ?? existingStore.Name;
    existingStore.StreetAddress = request.Dto.StreetAddress ?? existingStore.StreetAddress;
    existingStore.City = request.Dto.City ?? existingStore.City;
    existingStore.Zip = request.Dto.Zip ?? existingStore.Zip;

    await _storeRepo.Update(existingStore);

    return Ok();
  }
}