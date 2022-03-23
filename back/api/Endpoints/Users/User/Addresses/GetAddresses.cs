using api.Mapping.MappedTypes;
using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.User.Addresses;

public class GetAddresses : EndpointBaseAsync
  .WithRequest<int>
  .WithActionResult<IEnumerable<AddressResponse>>
{
  private readonly IAddressService _addressService;

  public GetAddresses(IAddressService aAddressService)
  {
    _addressService = aAddressService;
  }

  [Authorize(Policy = Policies.ViewUsers)]
  [HttpGet(Routes.Users.User.AddressesRoot)]
  public override async Task<ActionResult<IEnumerable<AddressResponse>>> HandleAsync(
    [FromRoute] int userId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var addresses = await _addressService.GetUserAddresses(userId);

    return Ok(addresses);
  }
}