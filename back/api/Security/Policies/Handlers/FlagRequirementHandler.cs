using System.Security.Claims;
using api.Security.Policies.Requirements;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace api.Security.Policies.Handlers;

public class FlagHandler : AuthorizationHandler<FlagRequirement>
{
  private readonly IUserService _userService;

  public FlagHandler(IUserService aUserService)
  {
    _userService = aUserService;
  }

  protected override async Task HandleRequirementAsync(
    AuthorizationHandlerContext context,
    FlagRequirement requirement)
  {
    var userIdClaim = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier);
    if (userIdClaim is null) return;

    var goodUserId = int.TryParse(userIdClaim.Value, out var userId);
    if (!goodUserId) return;

    var user = await _userService.GetById(userId);
    if (user is null) return;

    if (Flags.HasFlag(user.Flags, Flags.ADMINISTRATOR))
      context.Succeed(requirement);

    if (Flags.HasFlag(user.Flags, requirement.RequiredFlag))
      context.Succeed(requirement);
  }
}