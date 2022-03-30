using api.Exceptions;
using api.Repositories;
using api.RequestsAndResponses.Addresses;
using api.RequestsAndResponses.Addresses.UserGetOne;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.User.Addresses;

public class GetAddress : EndpointBaseAsync
  .WithRequest<UserGetOneAddress>
  .WithActionResult<AddressResponse>
{
  private readonly IMapper _mapper;
  private readonly IAddressRepo _addressRepo;

  public GetAddress(IMapper mapper, IAddressRepo addressRepo)
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
    var address = await _addressRepo.GetOne(request.UserId, request.AddressId);
    if (address is null) throw new AddressNotFoundException(request.AddressId);

    return Ok(_mapper.Map<AddressResponse>(address));
  }
}