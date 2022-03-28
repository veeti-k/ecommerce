using Microsoft.AspNetCore.Authorization;

namespace api.Security.Policies.Requirements;

public class FlagRequirement : IAuthorizationRequirement
{
  public Flags RequiredFlag;

  public FlagRequirement(Flags requiredFlag) =>
    RequiredFlag = requiredFlag;
}