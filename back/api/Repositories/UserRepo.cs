using api.Data;
using api.Models.User;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class UserRepo : GenericRepo<User>, IUserRepo
{
  private readonly DataContext _context;

  public UserRepo(DataContext context) : base(context)
  {
    _context = context;
  }

  public async Task<User?> GetOneWithSessions(int userId)
  {
    return await _context.Users
      .Include(user => user.Sessions)
      .Where(user => user.Id == userId)
      .FirstOrDefaultAsync();
  }

  public async Task<User?> GetByEmail(string email)
  {
    return await _context.Users
      .Where(user => user.Email == email)
      .FirstOrDefaultAsync();
  }

  public async Task<User?> GetByPhoneNumber(string phoneNumber)
  {
    return await _context.Users
      .Where(user => user.PhoneNumber == phoneNumber)
      .FirstOrDefaultAsync();
  }
}