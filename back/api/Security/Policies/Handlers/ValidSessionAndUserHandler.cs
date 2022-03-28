using System.Security.Claims;
using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Security.Policies.Requirements;
using api.Specifications.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace api.Security.Policies.Handlers;

public class ValidSessionAndUserHandler : AuthorizationHandler<ValidSessionAndUserRequirement>
{
  private readonly IGenericRepo<Session> _sessionRepo;
  private readonly IGenericRepo<User> _userRepo;


  public ValidSessionAndUserHandler(IGenericRepo<Session> sessionRepo, IGenericRepo<User> userRepo)
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
      throw new ForbiddenException("Provided token contained invalid userId");

    var goodSessionId = Guid.TryParse(sessionIdClaim.Value, out var tokenVersion);
    if (!goodSessionId)
      throw new ForbiddenException("Provided token contained invalid sessionId");

    var goodFlags = Flags.TryParse(flagsClaim.Value, out Flags flags);
    if (!goodFlags)
      throw new ForbiddenException("Provided token contained invalid flags");

    var user = await _userRepo
      .Specify(new UserGetWithSessionsSpec(userId))
      .FirstOrDefaultAsync();
    if (user is null) return;

    if (user.Flags.HasFlag(flags))
      throw new ForbiddenException("Provided token's data did not match with database");

    var currentSession = user.Sessions.FirstOrDefault(session => session.Id == tokenVersion);
    if (currentSession is null)
      throw new UnauthorizedException("Session does not exist");
    
    currentSession.LastUsedAt = DateTimeOffset.UtcNow;
    await _sessionRepo.Update(currentSession);
    
    context.Succeed(andUserRequirement);
  }
}