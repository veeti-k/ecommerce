using api.Repositories.Interfaces;
using api.RequestsAndResponses.User;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me;

public class GetMe : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<UserResponse>
{
  private readonly IMapper _mapper;
  private readonly IContextService _contextService;
  private readonly IUserRepo _userRepo;

  public GetMe(IMapper mapper, IContextService contextService, IUserRepo userRepo)
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

    var user = await _userRepo.GetOneWithSessions(userId);
    var userReponse = _mapper.Map<UserResponse>(user);

    foreach (var session in userReponse.Sessions)
      session.isCurrentSession = session.Id == sessionId;

    return Ok(userReponse);
  }
}