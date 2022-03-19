using Microsoft.AspNetCore.Authorization;

namespace api.Security.Policies.Requirements;

public class FlagRequirement : IAuthorizationRequirement
{
  public long RequiredFlag;

  public FlagRequirement(long requiredFlag) =>
    RequiredFlag = requiredFlag;
}