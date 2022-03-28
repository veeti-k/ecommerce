using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.User;
using api.RequestsAndResponses.User.UpdateUserFlags;
using api.Security;
using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.User;

public class UpdateUserFlags : EndpointBaseAsync
  .WithRequest<UpdateUserFlagsRequest>
  .WithActionResult<UserResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Models.User.User> _userRepo;
  private readonly IContextService _contextService;

  public UpdateUserFlags(IMapper mapper, IGenericRepo<Models.User.User> userRepo, IContextService contextService)
  {
    _mapper = mapper;
    _userRepo = userRepo;
    _contextService = contextService;
  }

  [Authorize(Policy = Policies.Administrator)]
  [HttpPatch(Routes.Users.User.Flags)]
  public override async Task<ActionResult<UserResponse>> HandleAsync(
    [FromRoute] UpdateUserFlagsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var user = await _userRepo.GetById(request.UserId);
    if (user is null) throw new UserNotFoundException(request.UserId);

    var currentUserId = _contextService.GetCurrentUserId();

    if (currentUserId == request.UserId && !request.Dto.flags.HasFlag(Flags.ADMINISTRATOR))
      throw new BadRequestException("You can not remove the flag ADMINISTRATOR from yourself");

    user.Flags = request.Dto.flags;

    var updated = await _userRepo.Update(user);

    return _mapper.Map<UserResponse>(updated);
  }
}