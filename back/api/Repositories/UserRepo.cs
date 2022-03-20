using api.Data;
using api.Models.User;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class UserRepo : IUserRepo
{
  private readonly DataContext _context;

  public UserRepo(DataContext context)
  {
    _context = context;
  }

  public async Task<User?> GetById(int userId)
  {
    return await _context.Users.Where(user => user.Id == userId).FirstOrDefaultAsync();
  }

  public async Task<User?> GetByEmail(string email)
  {
    return await _context.Users.Where(user => user.Email == email).FirstOrDefaultAsync();
  }

  public async Task<User?> GetByPhoneNumber(string phoneNumber)
  {
    return await _context.Users.Where(user => user.PhoneNumber == phoneNumber).FirstOrDefaultAsync();
  }

  public async Task<User> Add(User user, bool saveNow = true)
  {
    var added = _context.Add(user);
    if (saveNow) await _context.SaveChangesAsync();

    return added.Entity;
  }

  public async Task Remove(User user)
  {
    _context.Remove(user);
    await _context.SaveChangesAsync();
  }
}