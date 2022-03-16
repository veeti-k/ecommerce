using System.Security.Claims;
using api.Security.Policies.Requirements;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace api.Security.Policies.Handlers;

public class ValidSessionHandler : AuthorizationHandler<ValidSessionRequirement>
{
  private readonly ISessionService _sessionService;

  public ValidSessionHandler(ISessionService aSessionService)
  {
    _sessionService = aSessionService;
  }

  protected override async Task<Task> HandleRequirementAsync(
    AuthorizationHandlerContext context, ValidSessionRequirement requirement
  )
  {
    var tokenVersionClaim = context.User.FindFirst(c => c.Type == ClaimTypes.Version);
    if (tokenVersionClaim is null) return Task.CompletedTask;

    var userIdClaim = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier);
    if (userIdClaim is null) return Task.CompletedTask;

    var userIdIsGuid = Guid.TryParse(userIdClaim.Value, out var userId);
    if (!userIdIsGuid) return Task.CompletedTask;

    var tokenVersionIsGuid = Guid.TryParse(tokenVersionClaim.Value, out var tokenVersion);
    if (!tokenVersionIsGuid) return Task.CompletedTask;

    var sessions = await _sessionService.GetUserSessions(userId);
    if (!sessions.Any()) return Task.CompletedTask;

    foreach (var session in sessions)
    {
      if (session.Id != tokenVersion) continue;

      await _sessionService.UpdateLastUsedAt(session.Id);
      context.Succeed(requirement);
    }

    return Task.CompletedTask;
  }
}