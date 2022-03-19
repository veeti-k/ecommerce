using System.Linq.Expressions;
using api.Data;
using api.Models.User;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class UserRepo : IUserRepo
{
  private readonly DataContext _context;
  private readonly IQueryable<User?> _users;
  private readonly IQueryable<User?> _populatedUsers;

  public UserRepo(DataContext context)
  {
    _context = context;
    _users = _context.Users.Where(user => !user.IsDeleted);
    _populatedUsers = _users
      .Include(user => user.Addresses)
      .Include(user => user.Sessions);
  }

  public async Task<User?> GetById(int userId)
  {
    return await _users.Where(user => user.Id == userId).FirstOrDefaultAsync();
  }

  public async Task<User?> GetOneByFilter(Expression<Func<User, bool>> aFilter)
  {
    return await _populatedUsers.Where(aFilter).FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<User?>> GetManyByFilter(Expression<Func<User, bool>> aFilter)
  {
    return await _populatedUsers.Where(aFilter).ToListAsync();
  }

  public async Task<User> Add(User user)
  {
    var added = _context.Add(user);
    await _context.SaveChangesAsync();

    return added.Entity;
  }

  public async Task<User> Update(User user)
  {
    var updated = _context.Update(user);
    await _context.SaveChangesAsync();

    return updated.Entity;
  }
}