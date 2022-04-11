using System.Security.Claims;
using api.Exceptions;
using api.Repositories.Interfaces;
using api.Security.Policies.Requirements;
using Microsoft.AspNetCore.Authorization;

namespace api.Security.Policies.Handlers;

public class ValidSessionAndUserHandler : AuthorizationHandler<ValidSessionAndUserRequirement>
{
  private readonly ISessionRepo _sessionRepo;
  private readonly IUserRepo _userRepo;


  public ValidSessionAndUserHandler(
    ISessionRepo sessionRepo,
    IUserRepo userRepo)
  {
    _sessionRepo = sessionRepo;
    _userRepo = userRepo;
  }

  protected override async Task HandleRequirementAsync(
    AuthorizationHandlerContext context, ValidSessionAndUserRequirement andUserRequirement
  )
  {
    var claims = context.User.Claims;
    if (!claims.Any()) return;

    var sessionIdClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.Version);
    if (sessionIdClaim is null)
      throw new UnauthorizedException("Provided token did not contain sessionId");

    var userIdClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
    if (userIdClaim is null)
      throw new UnauthorizedException("Provided token did not contain userId");

    var flagsClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid);
    if (flagsClaim is null)
      throw new UnauthorizedException("Provided token did not contain flags");

    var goodUserId = int.TryParse(userIdClaim.Value, out var userId);
    if (!goodUserId)
      throw new UnauthorizedException("Provided token contained invalid userId");

    var goodSessionId = Guid.TryParse(sessionIdClaim.Value, out var tokenVersion);
    if (!goodSessionId)
      throw new UnauthorizedException("Provided token contained invalid sessionId");

    var goodFlags = Flags.TryParse(flagsClaim.Value, out Flags flags);
    if (!goodFlags)
      throw new UnauthorizedException("Provided token contained invalid flags");

    var user = await _userRepo.GetOneWithSessions(userId);
    if (user is null) return;

    if (user.Flags != flags)
      throw new UnauthorizedException("Provided token's data did not match with database");

    var currentSession = user.Sessions.FirstOrDefault(session => session.SessionId == tokenVersion);
    if (currentSession is null)
      throw new UnauthorizedException("Session does not exist");

    currentSession.LastUsedAt = DateTimeOffset.UtcNow;
    await _sessionRepo.Update(currentSession);

    context.Succeed(andUserRequirement);
  }
}