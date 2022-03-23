using api.Mapping.MappedTypes;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me.Addresses;

public class GetAddress : EndpointBaseAsync
  .WithRequest<Guid>
  .WithActionResult<AddressResponse>
{
  private readonly IContextService _contextService;
  private readonly IAddressService _addressService;

  public GetAddress(IContextService aContextService, IAddressService aAddressService)
  {
    _contextService = aContextService;
    _addressService = aAddressService;
  }

  [Authorize]
  [HttpGet(Routes.Users.Me.Addresses.Address)]
  public override async Task<ActionResult<AddressResponse>> HandleAsync(
    [FromRoute] Guid addressId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    var address = await _addressService.GetUserAddress(addressId, userId);

    return Ok(address);
  }
}