namespace api.Repositories.Session;

public interface ISessionRepo
{
  public Task<IEnumerable<Models.Session?>> GetUserSessions(Guid aUserId);
  public Task<Models.Session> Create(Guid aUserId);
  public Task Remove(Guid aSessionId);
  public Task UpdateLastUsedAt(Guid aSessionId);
}