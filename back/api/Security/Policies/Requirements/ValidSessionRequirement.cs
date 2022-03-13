using Microsoft.AspNetCore.Authorization;

namespace api.Security.Policies;

public class ValidSessionRequirement : IAuthorizationRequirement
{
  public ValidSessionRequirement()
  {
  }
}