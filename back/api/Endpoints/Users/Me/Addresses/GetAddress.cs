using api.Exceptions;
using api.Repositories;
using api.RequestsAndResponses.Addresses;
using api.RequestsAndResponses.Addresses.MeGetOne;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me.Addresses;

public class GetAddress : EndpointBaseAsync
  .WithRequest<MeGetOneAddressRequest>
  .WithActionResult<AddressResponse>
{
  private readonly IMapper _mapper;
  private readonly IContextService _contextService;
  private readonly IAddressRepo _addressRepo;

  public GetAddress(IMapper mapper, IContextService aContextService, IAddressRepo addressRepo)
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

    var address = await _addressRepo.GetOne(userId, request.AddressId);
    if (address is null) throw new AddressNotFoundException(request.AddressId);

    return _mapper.Map<AddressResponse>(address);
  }
}