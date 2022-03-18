using api.Models.User;

namespace api.Services.Interfaces;

public interface ISessionService
{
  public Task<IEnumerable<Session?>> GetUserSessions(int userId);
  public Task<Session> Create(int userId);
  public Task Remove(Guid sessionId);
  public Task RemoveMany(List<Guid> sessionIds, int userId);
  public Task UpdateLastUsedAt(Guid sessionId);
}