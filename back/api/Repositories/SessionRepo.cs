using System.Linq.Expressions;
using api.Data;
using api.Models.User;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class SessionRepo : ISessionRepo
{
  private readonly DataContext _context;

  public SessionRepo(DataContext context)
  {
    _context = context;
  }

  public async Task<IEnumerable<Session?>> GetManyByFilter(Expression<Func<Session, bool>> aFilter) =>
    await _context.Sessions.Where(aFilter).ToListAsync();


  public async Task<Session?> GetOneByFilter(Expression<Func<Session, bool>> aFilter) =>
    await _context.Sessions.Where(aFilter).FirstOrDefaultAsync();

  public async Task Create(Session aSession)
  {
    _context.Add(aSession);
    await _context.SaveChangesAsync();
  }

  public async Task Remove(Session aSession)
  {
    _context.Remove(aSession);
    await _context.SaveChangesAsync();
  }

  public async Task RemoveMany(IEnumerable<Session> sessions)
  {
    foreach (var session in sessions)
    {
      _context.Remove(session);
    }

    await _context.SaveChangesAsync();
  }

  public async Task Update(Session aSession)
  {
    _context.Update(aSession);
    await _context.SaveChangesAsync();
  }
}