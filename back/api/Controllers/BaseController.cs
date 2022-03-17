using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public abstract class BaseController : ControllerBase
{
  protected int? GetUserId()
  {
    var goodUserId = int.TryParse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
      out var userId);

    if (goodUserId) return userId;

    return null;
  }

  protected Guid? GetSessionId()
  {
    var goodUserId = Guid.TryParse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Version)?.Value,
      out var userId);

    if (goodUserId) return userId;

    return null;
  }
}