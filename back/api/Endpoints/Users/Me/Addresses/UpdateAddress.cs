using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Addresses;
using api.RequestsAndResponses.Addresses.MeUpdate;
using api.Services.Interfaces;
using api.Specifications.Address;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Users.Me.Addresses;

public class UpdateAddress : EndpointBaseAsync
  .WithRequest<MeUpdateAddressRequest>
  .WithActionResult<AddressResponse>
{
  private readonly IMapper _mapper;
  private readonly IContextService _contextService;
  private readonly IGenericRepo<Address> _addressRepo;

  public UpdateAddress(IMapper mapper, IContextService aContextService, IGenericRepo<Address> addressRepo)
  {
    _mapper = mapper;
    _contextService = aContextService;
    _addressRepo = addressRepo;
  }

  [Authorize]
  [HttpPatch(Routes.Users.Me.Addresses.Address)]
  public override async Task<ActionResult<AddressResponse>> HandleAsync(
    [FromRoute] MeUpdateAddressRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    var existingAddress = await _addressRepo
      .Specify(new AddressGetUserAddressSpec(userId, request.AddressId))
      .FirstOrDefaultAsync(cancellationToken);

    if (existingAddress is null) throw new AddressNotFoundException(request.AddressId);

    existingAddress.Name = request.Dto.Name ?? existingAddress.Name;
    existingAddress.City = request.Dto.City ?? existingAddress.City;
    existingAddress.Email = request.Dto.Email ?? existingAddress.Email;
    existingAddress.StreetAddress = request.Dto.StreetAddress ?? existingAddress.StreetAddress;
    existingAddress.State = request.Dto.State ?? existingAddress.State;
    existingAddress.PhoneNumber = request.Dto.PhoneNumber ?? existingAddress.PhoneNumber;
    existingAddress.Zip = request.Dto.Zip ?? existingAddress.Zip;

    var updated = await _addressRepo.Update(existingAddress);
    return Ok(_mapper.Map<AddressResponse>(updated));
  }
}