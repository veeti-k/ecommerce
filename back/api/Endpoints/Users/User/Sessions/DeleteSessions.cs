using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Sessions.UserDelete;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.User.Sessions;

public class DeleteSessions : EndpointBaseAsync
  .WithRequest<UserDeleteSessionsRequest>
  .WithActionResult
{
  private readonly ISessionRepo _sessionRepo;

  public DeleteSessions(ISessionRepo sessionRepo)
  {
    _sessionRepo = sessionRepo;
  }

  [Authorize]
  [HttpDelete(Routes.Users.User.Sessions)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] UserDeleteSessionsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var sessions = await _sessionRepo.GetMany(request.UserId);
    if (!sessions.Any()) throw new NotFoundException("Didn't find any sessions");

    await _sessionRepo.DeleteMany(sessions);
    
    return NoContent();
  }
}