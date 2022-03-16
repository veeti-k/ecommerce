using System.Security.Claims;
using api.Security.Policies.Requirements;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace api.Security.Policies.Handlers;

public class ValidUserIdHandler : AuthorizationHandler<ValidUserIdRequirement>
{
  private readonly IUserService _userService;

  public ValidUserIdHandler(IUserService userService)
  {
    _userService = userService;
  }

  protected override async Task<Task> HandleRequirementAsync(
    AuthorizationHandlerContext context, ValidUserIdRequirement requirement
  )
  {
    var userIdClaim = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier);
    if (userIdClaim is null) return Task.CompletedTask;

    var userIdIsGuid = Guid.TryParse(userIdClaim.Value, out var userId);
    if (!userIdIsGuid) return Task.CompletedTask;

    var user = await _userService.GetById(userId);
    if (user != null) context.Succeed(requirement);

    return Task.CompletedTask;
  }
}