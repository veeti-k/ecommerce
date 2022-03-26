using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Addresses;
using api.Services.Interfaces;
using api.Specifications.Address;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Users.Me.Addresses;

public class GetAddresses : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<IEnumerable<AddressResponse>>
{
  private readonly IMapper _mapper;
  private readonly IContextService _contextService;
  private readonly IGenericRepo<Address> _addressRepo;

  public GetAddresses(IMapper mapper, IContextService aContextService, IGenericRepo<Address> addressRepo )
  {
    _mapper = mapper;
    _contextService = aContextService;
    _addressRepo = addressRepo;
  }

  [Authorize]
  [HttpGet(Routes.Users.Me.AddressesRoot)]
  public override async Task<ActionResult<IEnumerable<AddressResponse>>> HandleAsync
    (CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    var addresses = await _addressRepo
      .Specify(new AddressGetUserAddressesSpec(userId))
      .ToListAsync(cancellationToken);

    return Ok(_mapper.Map<IEnumerable<AddressResponse>>(addresses));
  }
}