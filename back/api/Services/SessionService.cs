using api.Models.User;
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

  public async Task<IEnumerable<Session?>> GetUserSessions(int userId) =>
    await _sessionRepo.GetManyByFilter(session => session.UserId == userId);

  public async Task<Session> Create(int userId)
  {
    Session newSession = new()
    {
      Id = Guid.NewGuid(),
      UserId = userId,
      CreatedAt = DateTimeOffset.UtcNow,
      LastUsedAt = DateTimeOffset.UtcNow,
    };

    await _sessionRepo.Create(newSession);
    return newSession;
  }

  public async Task Remove(Guid sessionId)
  {
    var session = await _sessionRepo.GetOneByFilter(session => session.Id == sessionId);
    if (session == null) return;

    await _sessionRepo.Remove(session);
  }

  public async Task RemoveMany(List<Guid> sessionIds, int userId)
  {
    var sessions = await _sessionRepo
      .GetManyByFilter(session => sessionIds.Contains(session.Id)
                                  && session.UserId == userId);

    if (!sessions.Any()) return;

    await _sessionRepo.RemoveMany(sessions);
  }

  public async Task UpdateLastUsedAt(Guid sessionId)
  {
    var session = await _sessionRepo.GetOneByFilter(session => session.Id == sessionId);
    if (session == null) return;

    session.LastUsedAt = DateTimeOffset.UtcNow;
    await _sessionRepo.Update(session);
  }
}