using api.DTOs;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.User.Sessions;

public class UserIdDeleteSessionsRequest
{
  [FromRoute(Name = "userId")] public int UserId { get; set; }
  [FromBody] public InvalidateSessionDTO Dto { get; set; }
}

public class DeleteSessions : EndpointBaseAsync
  .WithRequest<UserIdDeleteSessionsRequest>
  .WithActionResult
{
  private readonly ISessionService _sessionService;

  public DeleteSessions(ISessionService aSessionService)
  {
    _sessionService = aSessionService;
  }

  [Authorize]
  [HttpDelete(Routes.Users.User.Sessions)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] UserIdDeleteSessionsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _sessionService.RemoveMany(request.Dto.SessionIds, request.UserId);

    return NoContent();
  }
}