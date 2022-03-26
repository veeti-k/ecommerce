using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Addresses;
using api.RequestsAndResponses.Addresses.UserGetAddresses;
using api.Security.Policies;
using api.Specifications.Address;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Users.User.Addresses;

public class GetAddresses : EndpointBaseAsync
  .WithRequest<UserGetAddressesRequest>
  .WithActionResult<IEnumerable<AddressResponse>>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Address> _addressRepo;

  public GetAddresses(IMapper mapper, IGenericRepo<Address> addressRepo)
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
    var addresses = await _addressRepo
      .Specify(new AddressGetUserAddressesSpec(request.UserId))
      .ToListAsync(cancellationToken);

    return Ok(_mapper.Map<IEnumerable<AddressResponse>>(addresses));
  }
}