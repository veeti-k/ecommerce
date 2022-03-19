using api.DTOs;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me.Sessions;

public class DeleteSessions : EndpointBaseAsync
  .WithRequest<InvalidateSessionDTO>
  .WithActionResult
{
  private readonly ISessionService _sessionService;
  private readonly IContextService _contextService;

  [Authorize]
  [HttpDelete(Routes.Users.Me.Sessions)]
  public override async Task<ActionResult> HandleAsync(InvalidateSessionDTO request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    await _sessionService.RemoveMany(request.SessionIds, userId);

    return NoContent();
  }
}