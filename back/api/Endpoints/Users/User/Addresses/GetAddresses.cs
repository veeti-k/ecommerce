using api.Repositories;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Addresses;
using api.RequestsAndResponses.Addresses.UserGetAddresses;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.User.Addresses;

public class GetAddresses : EndpointBaseAsync
  .WithRequest<UserGetAddressesRequest>
  .WithActionResult<IEnumerable<AddressResponse>>
{
  private readonly IMapper _mapper;
  private readonly IAddressRepo _addressRepo;

  public GetAddresses(IMapper mapper, IAddressRepo addressRepo)
  {
    _mapper = mapper;
    _addressRepo = addressRepo;
  }

  [Authorize(Policy = Policies.ViewUsers)]
  [HttpGet(Routes.Users.User.AddressesRoot)]
  public override async Task<ActionResult<IEnumerable<AddressResponse>>> HandleAsync(
    [FromRoute] UserGetAddressesRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var addresses = await _addressRepo.GetMany(request.UserId);

    return Ok(_mapper.Map<IEnumerable<AddressResponse>>(addresses));
  }
}