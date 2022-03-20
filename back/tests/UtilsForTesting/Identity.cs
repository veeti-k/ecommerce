using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace tests.ControllerTests.Utils;

public static class Identity
{
  public static ClaimsPrincipal CreateFakeClaimsPrincipal(object aNameIdentifier, object aVersion)
  {
    var claims = new List<Claim>()
    {
      new(ClaimTypes.NameIdentifier, aNameIdentifier.ToString()),
      new(ClaimTypes.Version, aVersion.ToString())
    };
    var identity = new ClaimsIdentity(claims, "test");
    return new ClaimsPrincipal(identity);
  }
}