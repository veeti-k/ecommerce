using api.DTOs;
using api.Mapping.MappedTypes;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me.Addresses;

public class CreateAddress : EndpointBaseAsync
  .WithRequest<CreateAddressDTO>
  .WithActionResult<AddressResponse>
{
  private readonly IContextService _contextService;
  private readonly IAddressService _addressService;

  public CreateAddress(IContextService aContextService, IAddressService aAddressService)
  {
    _contextService = aContextService;
    _addressService = aAddressService;
  }

  [Authorize]
  [HttpPost(Routes.Users.Me.Addresses)]
  public override async Task<ActionResult<AddressResponse>> HandleAsync(
    CreateAddressDTO request, 
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    var createdAddress = await _addressService.Create(request, userId);

    return Created("", createdAddress);
  }
}