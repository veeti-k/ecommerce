using api.Repositories.Interfaces;
using api.RequestsAndResponses.User;
using api.Services.Interfaces;
using api.Specifications.User;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Users.Me;

public class GetMe : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<UserResponse>
{
  private readonly IMapper _mapper;
  private readonly IContextService _contextService;
  private readonly IGenericRepo<Models.User.User> _userRepo;

  public GetMe(IMapper mapper, IContextService contextService, IGenericRepo<Models.User.User> userRepo)
  {
    _mapper = mapper;
    _contextService = contextService;
    _userRepo = userRepo;
  }

  [Authorize]
  [HttpGet(Routes.Users.MeRoot)]
  public override async Task<ActionResult<UserResponse>> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();
    var sessionId = _contextService.GetCurrentSessionId();

    var user = await _userRepo
      .Specify(new UserGetWithSessionsSpec(userId))
      .FirstOrDefaultAsync(cancellationToken);

    // TODO: mark current session

    return Ok(user);
  }
}