using System.Linq.Expressions;
using api.Data;
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

  public async Task<IEnumerable<Models.Session?>> GetManyByFilter(Expression<Func<Models.Session, bool>> aFilter) =>
    await _context.Sessions.Where(aFilter).ToListAsync();


  public async Task<Models.Session?> GetOneByFilter(Expression<Func<Models.Session, bool>> aFilter) =>
    await _context.Sessions.Where(aFilter).FirstOrDefaultAsync();

  public async Task Create(Models.Session aSession)
  {
    _context.Add(aSession);
    await _context.SaveChangesAsync();
  }

  public async Task Remove(Models.Session aSession)
  {
    _context.Remove(aSession);
    await _context.SaveChangesAsync();
  }

  public async Task Update(Models.Session aSession)
  {
    _context.Update(aSession);
    await _context.SaveChangesAsync();
  }
}