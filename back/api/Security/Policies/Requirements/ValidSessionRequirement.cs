﻿using Microsoft.AspNetCore.Authorization;

namespace api.Security.Policies.Requirements;

public class ValidSessionRequirement : IAuthorizationRequirement
{
  public ValidSessionRequirement()
  {
  }
}