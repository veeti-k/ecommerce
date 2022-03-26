using System.Security.Claims;
using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Security.Policies.Requirements;
using api.Specifications.Session;
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

    var goodFlags = long.TryParse(flagsClaim.Value, out var flags);
    if (!goodFlags)
      throw new ForbiddenException("Provided token contained invalid flags");

    var session = await _sessionRepo
      .Specify(new SessionGetOneSpec(userId, tokenVersion))
      .FirstOrDefaultAsync();
    if (session is null) return;

    var user = await _userRepo.GetById(userId);
    if (user is null) return;

    if (user.Flags != flags)
      throw new ForbiddenException("Provided token's data did not match with database");

    session.LastUsedAt = DateTimeOffset.UtcNow;
    await _sessionRepo.Update(session);
    
    context.Succeed(andUserRequirement);
  }
}