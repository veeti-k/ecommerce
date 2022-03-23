using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me.Addresses;

public class RemoveAddress : EndpointBaseAsync
  .WithRequest<Guid>
  .WithActionResult
{
  private readonly IAddressService _addressService;
  private readonly IContextService _contextService;

  public RemoveAddress(IAddressService aAddressService, IContextService aContextService)
  {
    _addressService = aAddressService;
    _contextService = aContextService;
  }

  [HttpDelete(Routes.Users.Me.Addresses.Address)]
  public override async Task<ActionResult> HandleAsync(
    Guid addressId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    await _addressService.Remove(userId, addressId);

    return NoContent();
  }
}