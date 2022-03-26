using System.Security.Claims;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Security.Policies.Requirements;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Security.Policies.Handlers;

public class FlagHandler : AuthorizationHandler<FlagRequirement>
{
  private readonly IGenericRepo<User> _userRepo;

  public FlagHandler(IGenericRepo<User> userRepo)
  {
    _userRepo = userRepo;
  }

  protected override async Task HandleRequirementAsync(
    AuthorizationHandlerContext context,
    FlagRequirement requirement)
  {
    if (context.HasFailed) return;
    
    var userIdClaim = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier);
    if (userIdClaim is null) return;

    var goodUserId = int.TryParse(userIdClaim.Value, out var userId);
    if (!goodUserId) return;

    var user = await _userRepo.GetById(userId);
    if (user is null) return;

    if (Flags.HasFlag(user.Flags, Flags.ADMINISTRATOR))
    {
      context.Succeed(requirement);
      return;
    }

    if (Flags.HasFlag(user.Flags, requirement.RequiredFlag))
      context.Succeed(requirement);
  }
}