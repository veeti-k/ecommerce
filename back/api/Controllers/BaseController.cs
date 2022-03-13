using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public abstract class BaseController : ControllerBase
{
  protected Guid GetUserId()
  {
    return Guid.Parse(this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);
  }

  protected Guid GetSessionId()
  {
    return Guid.Parse(this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Version).Value);
  }
}