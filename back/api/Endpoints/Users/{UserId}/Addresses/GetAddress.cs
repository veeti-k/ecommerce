using api.Mapping.MappedTypes;
using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.UserId.Addresses;

public class UserIdGetAddressRequest
{
  [FromRoute(Name = "userId")] public int UserId { get; set; }
  [FromRoute(Name = "addressId")] public Guid AddressId { get; set; }
}

public class GetAddress : EndpointBaseAsync
  .WithRequest<UserIdGetAddressRequest>
  .WithActionResult<AddressResponse>
{
  private readonly IAddressService _addressService;

  public GetAddress(IAddressService addressService)
  {
    _addressService = addressService;
  }

  [Authorize(Policy = Policies.ViewUsers)]
  [HttpGet(Routes.Users.User.AddressesAddress)]
  public override async Task<ActionResult<AddressResponse>> HandleAsync(
    [FromRoute] UserIdGetAddressRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var address = await _addressService.GetUserAddress(request.AddressId, request.UserId);

    return Ok(address);
  }
}