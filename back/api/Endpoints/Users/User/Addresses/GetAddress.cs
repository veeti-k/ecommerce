using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Addresses;
using api.RequestsAndResponses.Addresses.UserGetOne;
using api.Security.Policies;
using api.Specifications.Address;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Users.User.Addresses;

public class GetAddress : EndpointBaseAsync
  .WithRequest<UserGetOneAddress>
  .WithActionResult<AddressResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Address> _addressRepo;

  public GetAddress(IMapper mapper, IGenericRepo<Address> addressRepo)
  {
    _mapper = mapper;
    _addressRepo = addressRepo;
  }

  [Authorize(Policy = Policies.ViewUsers)]
  [HttpGet(Routes.Users.User.Addresses.Address)]
  public override async Task<ActionResult<AddressResponse>> HandleAsync(
    [FromRoute] UserGetOneAddress request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var address = await _addressRepo
      .Specify(new AddressGetUserAddressSpec(request.UserId, request.AddressId))
      .FirstOrDefaultAsync(cancellationToken);

    if (address is null) throw new NotFoundException($"Address with {request.AddressId} was not found");

    return Ok(_mapper.Map<AddressResponse>(address));
  }
}