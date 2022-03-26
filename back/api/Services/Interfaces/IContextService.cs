namespace api.Services.Interfaces;

public interface IContextService
{
  public int GetCurrentUserId();
  public Guid GetCurrentSessionId();
  public long GetCurrentUserFlags();
}