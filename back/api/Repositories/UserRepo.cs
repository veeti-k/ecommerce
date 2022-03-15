using System.Linq.Expressions;
using api.Data;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class UserRepo : IUserRepo
{
  private readonly DataContext _context;
  private readonly IQueryable<Models.User?> _populatedUsers;

  public UserRepo(DataContext context)
  {
    _context = context;
    _populatedUsers = _context.Users
      .Include(user => user.Addresses)
      .Include(user => user.Sessions);
  }

  public async Task<Models.User?> GetOneByFilter(Expression<Func<Models.User, bool>> aFilter)
  {
    return await _populatedUsers.Where(aFilter).FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<Models.User?>> GetManyByFilter(Expression<Func<Models.User, bool>> aFilter)
  {
    return await _populatedUsers.Where(aFilter).ToListAsync();
  }

  public async Task Add(Models.User user)
  {
    _context.Add(user);
    await _context.SaveChangesAsync();
  }

  public async Task Remove(Models.User user)
  {
    _context.Remove(user);
    await _context.SaveChangesAsync();
  }
}