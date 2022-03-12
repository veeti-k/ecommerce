using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public abstract class BaseController : ControllerBase
{
  protected Guid? GetUserId()
  {
    var success = Guid.TryParse(this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value,
      out var userId);

    if (!success) return null;

    return userId;
  }
}