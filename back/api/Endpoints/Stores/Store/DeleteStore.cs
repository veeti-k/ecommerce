using api.Exceptions;
using api.Repositories.Interfaces;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Stores.Store;

public class DeleteStore : EndpointBaseAsync
  .WithRequest<Guid>
  .WithActionResult
{
  private readonly IGenericRepo<Models.Store> _storeRepo;

  public DeleteStore(IGenericRepo<Models.Store> storeRepo)
  {
    _storeRepo = storeRepo;
  }

  [Authorize(Policy = Policies.ManageStores)]
  [HttpDelete(Routes.Stores.StoreRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] Guid storeId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var existingStore = await _storeRepo.GetById(storeId);
    if (existingStore is null) throw new StoreNotFoundException(storeId);

    await _storeRepo.Delete(existingStore);

    return NoContent();
  }
}