using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Addresses;
using api.RequestsAndResponses.Addresses.MeGetOne;
using api.Services.Interfaces;
using api.Specifications.Address;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Users.Me.Addresses;

public class GetAddress : EndpointBaseAsync
  .WithRequest<MeGetOneAddressRequest>
  .WithActionResult<AddressResponse>
{
  private readonly IMapper _mapper;
  private readonly IContextService _contextService;
  private readonly IGenericRepo<Address> _addressRepo;

  public GetAddress(IMapper mapper, IContextService aContextService, IGenericRepo<Address> addressRepo)
  {
    _mapper = mapper;
    _addressRepo = addressRepo;
    _contextService = aContextService;
  }

  [Authorize]
  [HttpGet(Routes.Users.Me.Addresses.Address)]
  public override async Task<ActionResult<AddressResponse>> HandleAsync(
    [FromRoute] MeGetOneAddressRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    var address = await _addressRepo
      .Specify(new AddressGetUserAddressSpec(userId, request.AddressId))
      .FirstOrDefaultAsync(cancellationToken);

    if (address is null) throw new NotFoundException($"Address with {request.AddressId} was not found");

    return _mapper.Map<AddressResponse>(address);
  }
}