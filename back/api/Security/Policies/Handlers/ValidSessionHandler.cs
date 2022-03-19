using System.Security.Claims;
using api.Exceptions;
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

  protected override async Task HandleRequirementAsync(
    AuthorizationHandlerContext context, ValidSessionRequirement requirement
  )
  {
    var tokenVersionClaim = context.User.FindFirst(c => c.Type == ClaimTypes.Version);
    if (tokenVersionClaim is null) return;

    var userIdClaim = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier);
    if (userIdClaim is null) return;

    var goodUserId = int.TryParse(userIdClaim.Value, out var userId);
    if (!goodUserId) return;

    var tokenVersionIsGuid = Guid.TryParse(tokenVersionClaim.Value, out var tokenVersion);
    if (!tokenVersionIsGuid) return;

    var session = await _sessionService.GetSession(tokenVersion, userId);
    if (session is null) throw new ForbiddenException("Invalid session");

    await _sessionService.UpdateLastUsedAt(session.Id);
    context.Succeed(requirement);
  }
}