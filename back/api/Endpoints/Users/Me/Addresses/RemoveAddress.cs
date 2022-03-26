using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Addresses.MeDelete;
using api.Services.Interfaces;
using api.Specifications.Address;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Users.Me.Addresses;

public class RemoveAddress : EndpointBaseAsync
  .WithRequest<MeDeleteAddressRequest>
  .WithActionResult
{
  private readonly IContextService _contextService;
  private readonly IGenericRepo<Address> _addressRepo;

  public RemoveAddress(IContextService contextService, IGenericRepo<Address> addressRepo)
  {
    _contextService = contextService;
    _addressRepo = addressRepo;
  }

  [HttpDelete(Routes.Users.Me.Addresses.Address)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] MeDeleteAddressRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    var addressToRemove = await _addressRepo
      .Specify(new AddressGetUserAddressSpec(userId, request.AddressId))
      .FirstOrDefaultAsync(cancellationToken);

    if (addressToRemove is null) throw new NotFoundException($"Address with id {request.AddressId} was not found");

    await _addressRepo.Delete(addressToRemove);
    return NoContent();
  }
}