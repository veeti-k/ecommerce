using System.Security.Claims;
using api.Repositories.User;
using Microsoft.AspNetCore.Authorization;

namespace api.Security.Policies.Handlers;

public class ValidTokenVersionHandler : AuthorizationHandler<ValidTokenVersionRequirement>
{
  private readonly IUserRepo _userUserRepo;
  
  public ValidTokenVersionHandler(IUserRepo userUserRepo)
  {
    _userUserRepo = userUserRepo;
  }
  
  protected override async Task<Task> HandleRequirementAsync(
    AuthorizationHandlerContext context, ValidTokenVersionRequirement requirement
  )
  {
    var tokenVersionClaim = context.User.FindFirst(c => c.Type == ClaimTypes.Version);
    var userIdClaim = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier);

    if (tokenVersionClaim is null) return Task.CompletedTask;
    if (userIdClaim is null) return Task.CompletedTask;

    var userIdIsGuid = Guid.TryParse(userIdClaim.Value, out var userId);
    if (!userIdIsGuid) return Task.CompletedTask;

    var tokenVersionIsGuid = Guid.TryParse(tokenVersionClaim.Value, out var tokenVersion);
    if (!tokenVersionIsGuid) return Task.CompletedTask;

    var user = await _userUserRepo.GetOneById(userId);
    if (user is null) return Task.CompletedTask;
    
    if (tokenVersion == user.TokenVersion) context.Succeed(requirement);

    return Task.CompletedTask;
  }
}