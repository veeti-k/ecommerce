using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Sessions.MeDelete;
using api.Services.Interfaces;
using api.Specifications.Session;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Users.Me.Sessions;

public class DeleteSession : EndpointBaseAsync
  .WithRequest<MeDeleteSessionsRequest>
  .WithActionResult

{
  private readonly IContextService _contextService;
  private readonly IGenericRepo<Session> _sessionRepo;

  public DeleteSession(IContextService contextService, IGenericRepo<Session> sessionRepo)
  {
    _contextService = contextService;
    _sessionRepo = sessionRepo;
  }

  [HttpDelete(Routes.Users.Me.Sessions.Session)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] MeDeleteSessionsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    var session = await _sessionRepo
      .Specify(new SessionGetOneSpec(userId, request.SessionId))
      .FirstOrDefaultAsync(cancellationToken);

    if (session is null) 
      throw new NotFoundException($"Session with id {request.SessionId} was not found");

    await _sessionRepo.Delete(session);
    
    return NoContent();
  }
}