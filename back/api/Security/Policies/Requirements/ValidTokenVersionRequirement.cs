using Microsoft.AspNetCore.Authorization;

namespace api.Security.Policies;

public class ValidTokenVersionRequirement : IAuthorizationRequirement
{
  public ValidTokenVersionRequirement()
  {
  }
}