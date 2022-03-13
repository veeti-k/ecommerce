using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Session;

public class SessionRepo : ISessionRepo
{
  private readonly DataContext _context;

  public SessionRepo(DataContext context)
  {
    _context = context;
  }

  public async Task<IEnumerable<Models.Session?>> GetUserSessions(Guid aUserId)
  {
    return await _context.Sessions.Where(s => s.UserId == aUserId).ToListAsync();
  }

  public async Task<Models.Session> Create(Guid aUserId)
  {
    Models.Session newSession = new()
    {
      Id = Guid.NewGuid(),
      UserId = aUserId,
      CreatedAt = DateTime.UtcNow.ToString("o"),
      LastUsedAt = DateTime.UtcNow.ToString("o"),
    };

    _context.Add(newSession);
    await _context.SaveChangesAsync();

    return newSession;
  }

  public async Task Remove(Guid aSessionId)
  {
    var session = await _context.Sessions.FirstOrDefaultAsync(s => s.Id == aSessionId);
    if (session == null) return;

    _context.Remove(session);
    await _context.SaveChangesAsync();
  }

  public async Task UpdateLastUsedAt(Guid aSessionId)
  {
    var session = await _context.Sessions
      .FirstOrDefaultAsync(session => session.Id == aSessionId);

    if (session == null) return;

    session.LastUsedAt = DateTime.UtcNow.ToString("o");
    await _context.SaveChangesAsync();
  }
}