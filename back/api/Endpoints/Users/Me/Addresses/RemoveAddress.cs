using api.Exceptions;
using api.Repositories;
using api.RequestsAndResponses.Addresses.MeDelete;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me.Addresses;

public class RemoveAddress : EndpointBaseAsync
  .WithRequest<MeDeleteAddressRequest>
  .WithActionResult
{
  private readonly IContextService _contextService;
  private readonly IAddressRepo _addressRepo;

  public RemoveAddress(IContextService contextService, IAddressRepo addressRepo)
  {
    _contextService = contextService;
    _addressRepo = addressRepo;
  }

  [HttpDelete(Routes.Users.Me.Addresses.Address)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] MeDeleteAddressRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    var addressToRemove = await _addressRepo.GetOne(userId, request.AddressId);
    if (addressToRemove is null) throw new AddressNotFoundException(request.AddressId);

    await _addressRepo.Delete(addressToRemove);
    return NoContent();
  }
}