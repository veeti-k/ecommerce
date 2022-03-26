using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Addresses;
using api.RequestsAndResponses.Addresses.Add;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me.Addresses;

public class CreateAddress : EndpointBaseAsync
  .WithRequest<AddAddressRequest>
  .WithActionResult<AddressResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Address> _addressRepo;
  private readonly IContextService _contextService;

  public CreateAddress(IMapper mapper, IGenericRepo<Address> addressRepo, IContextService aContextService)
  {
    _mapper = mapper;
    _addressRepo = addressRepo;
    _contextService = aContextService;
  }

  [Authorize]
  [HttpPost(Routes.Users.Me.AddressesRoot)]
  public override async Task<ActionResult<AddressResponse>> HandleAsync(
    [FromRoute] AddAddressRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();
    
    Address newAddress = new()
    {
      Id = Guid.NewGuid(),
      UserId = userId,
      Name = request.Dto.Name,
      PhoneNumber = request.Dto.PhoneNumber,
      Email = request.Dto.Email,
      StreetAddress = request.Dto.StreetAddress,
      City = request.Dto.City,
      State = request.Dto.State,
      Zip = request.Dto.Zip
    };
    
    var created = await _addressRepo.Add(newAddress);
    return Created("", _mapper.Map<AddressResponse>(created));
  }
}