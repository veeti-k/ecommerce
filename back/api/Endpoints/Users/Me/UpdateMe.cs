using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.User;
using api.RequestsAndResponses.User.UpdateMe;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me;

public class UpdateMe : EndpointBaseAsync
  .WithRequest<UpdateMeRequest>
  .WithActionResult<UserResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Models.User.User> _userRepo;
  private readonly IContextService _contextService;

  public UpdateMe(IMapper mapper, IGenericRepo<Models.User.User> userRepo, IContextService contextService)
  {
    _mapper = mapper;
    _userRepo = userRepo;
    _contextService = contextService;
  }

  [Authorize]
  [HttpPatch(Routes.Users.MeRoot)]
  public override async Task<ActionResult<UserResponse>> HandleAsync(
    [FromRoute] UpdateMeRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();
    var user = await _userRepo.GetById(userId);
    if (user is null) throw new UserNotFoundException(userId);

    user.Name = request.Dto.Name ?? user.Name;
    user.PhoneNumber = request.Dto.PhoneNumber ?? user.PhoneNumber;
    user.Email = request.Dto.Email ?? user.Email;

    var updated = await _userRepo.Update(user);
    return Ok(_mapper.Map<UserResponse>(updated));
  }
}