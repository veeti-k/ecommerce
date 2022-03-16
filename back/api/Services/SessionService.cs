using api.Models;
using api.Repositories.Interfaces;
using api.Services.Interfaces;

namespace api.Services;

public class SessionService : ISessionService
{
  private readonly ISessionRepo _sessionRepo;

  public SessionService(ISessionRepo aSessionRepo)
  {
    _sessionRepo = aSessionRepo;
  }

  public async Task<IEnumerable<Session?>> GetUserSessions(Guid aUserId) =>
    await _sessionRepo.GetManyByFilter(session => session.UserId == aUserId);

  public async Task<Session> Create(Guid aUserId)
  {
    Session newSession = new()
    {
      Id = Guid.NewGuid(),
      UserId = aUserId,
      CreatedAt = DateTimeOffset.UtcNow,
      LastUsedAt = DateTimeOffset.UtcNow,
    };

    await _sessionRepo.Create(newSession);
    return newSession;
  }

  public async Task Remove(Guid aSessionId)
  {
    var session = await _sessionRepo.GetOneByFilter(session => session.Id == aSessionId);
    if (session == null) return;

    await _sessionRepo.Remove(session);
  }

  public async Task UpdateLastUsedAt(Guid aSessionId)
  {
    var session = await _sessionRepo.GetOneByFilter(session => session.Id == aSessionId);
    if (session == null) return;

    session.LastUsedAt = DateTimeOffset.UtcNow;
    await _sessionRepo.Update(session);
  }
}