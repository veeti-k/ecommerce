using api.Models;

namespace api.Services.Interfaces;

public interface ISessionService
{
  public Task<IEnumerable<Session?>> GetUserSessions(Guid aUserId);
  public Task<Session> Create(Guid aUserId);
  public Task Remove(Guid aSessionId);
  public Task UpdateLastUsedAt(Guid aSessionId);
}