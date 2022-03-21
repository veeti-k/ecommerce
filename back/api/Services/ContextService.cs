using System.Security.Claims;
using api.Services.Interfaces;

namespace api.Services;

public class ContextService : IContextService
{
  private readonly IHttpContextAccessor _accessor;

  public ContextService(IHttpContextAccessor aAccessor)
  {
    _accessor = aAccessor;
  }

  public int GetCurrentUserId()
  {
    var context = _accessor.HttpContext;
    if (context is null) return default;

    var goodUserId =
      int.TryParse(context.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value,
        out var userId);

    return !goodUserId ? default : userId;
  }

  public Guid GetCurrentSessionId()
  {
    var context = _accessor.HttpContext;
    if (context is null) return default;

    var goodSessionId =
      Guid.TryParse(context.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Version)?.Value,
        out var userId);

    return !goodSessionId ? default : userId;
  }
  
  public long GetCurrentUserFlags()
  {
    var context = _accessor.HttpContext;
    if (context is null) return default;

    var goodFlags =
      long.TryParse(context.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Sid)?.Value,
        out var flags);

    return !goodFlags ? default : flags;
  }
}