using api.DTOs;
using api.Mapping.MappedTypes;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me.Addresses;

public class MeUpdateAddressRequest
{
  [FromRoute(Name = "addressId")] public Guid AddressId { get; set; }
  [FromBody] public UpdateAddressDTO Dto { get; set; }
}

public class UpdateAddress : EndpointBaseAsync
  .WithRequest<MeUpdateAddressRequest>
  .WithActionResult<AddressResponse>
{
  private readonly IContextService _contextService;
  private readonly IAddressService _addressService;

  public UpdateAddress(IContextService aContextService, IAddressService aAddressService)
  {
    _contextService = aContextService;
    _addressService = aAddressService;
  }

  [Authorize]
  [HttpPatch(Routes.Users.Me.AddressesAddress)]
  public override async Task<ActionResult<AddressResponse>> HandleAsync(
    [FromRoute] MeUpdateAddressRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    var updatedAddress = await _addressService.Update(request.Dto, userId, request.AddressId);

    return Ok(updatedAddress);
  }
}