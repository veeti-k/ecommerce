using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Sessions.UserDelete;
using api.Specifications.Session;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Users.User.Sessions;

public class DeleteSessions : EndpointBaseAsync
  .WithRequest<UserDeleteSessionsRequest>
  .WithActionResult
{
  private readonly IGenericRepo<Session> _sessionRepo;

  public DeleteSessions(IGenericRepo<Session> sessionRepo)
  {
    _sessionRepo = sessionRepo;
  }

  [Authorize]
  [HttpDelete(Routes.Users.User.Sessions)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] UserDeleteSessionsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var sessions = await _sessionRepo
      .Specify(new SessionGetManySpec(request.UserId, request.Dto.SessionIds))
      .ToListAsync(cancellationToken);

    if (!sessions.Any()) throw new NotFoundException("Didn't found any sessions");

    await _sessionRepo.DeleteMany(sessions);
    
    return NoContent();
  }
}