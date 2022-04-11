using api.Data;
using api.Models.User;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class SessionRepo : GenericRepo<Session>, ISessionRepo
{
  private readonly DataContext _context;

  public SessionRepo(DataContext context) : base(context)
  {
    _context = context;
  }

  public async Task<Session?> GetOne(int userId, Guid sessionId)
  {
    return await _context.Sessions
      .Where(session => session.SessionId == sessionId
                        && session.UserId == userId)
      .FirstOrDefaultAsync();
  }

  public async Task<List<Session?>> GetMany(int userId)
  {
    return await _context.Sessions
      .Where(session => session.UserId == userId)
      .ToListAsync();
  }
}