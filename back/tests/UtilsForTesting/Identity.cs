using System.Collections.Generic;
using System.Security.Claims;

namespace tests.ControllerTests.Utils;

public static class Identity
{
  public static ClaimsPrincipal CreateFakeClaimsPrincipal(object aNameIdentifier, object aVersion, object aFlags)
  {
    var claims = new List<Claim>()
    {
      new(ClaimTypes.NameIdentifier, aNameIdentifier.ToString()),
      new(ClaimTypes.Version, aVersion.ToString()),
      new(ClaimTypes.Sid, aFlags.ToString())
    };
    var identity = new ClaimsIdentity(claims, "test");
    return new ClaimsPrincipal(identity);
  }
}