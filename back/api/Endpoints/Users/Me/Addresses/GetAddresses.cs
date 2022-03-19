using api.Mapping.MappedTypes;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me.Addresses;

public class GetAddresses : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<IEnumerable<AddressResponse>>
{
  private readonly IContextService _contextService;
  private readonly IAddressService _addressService;

  public GetAddresses(IContextService aContextService, IAddressService aAddressService)
  {
    _contextService = aContextService;
    _addressService = aAddressService;
  }

  [Authorize]
  [HttpGet(Routes.Users.Me.Addresses)]
  public override async Task<ActionResult<IEnumerable<AddressResponse>>> HandleAsync
    (CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    var addresses = await _addressService.GetUserAddresses(userId);

    return Ok(addresses);
  }
}