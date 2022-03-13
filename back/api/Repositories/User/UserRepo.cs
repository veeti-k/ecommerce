using System.Linq.Expressions;
using api.Data;
using api.DTOs.Auth;
using api.Exceptions;
using api.Utils;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.User;

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

  public async Task<Models.User?> GetByPhoneNumber(string aPhoneNumber)
  {
    return await GetOneByFilter(user => user.PhoneNumber == aPhoneNumber);
  }

  public async Task<Models.User?> GetByEmail(string aEmail)
  {
    return await GetOneByFilter(user => user.Email == aEmail);
  }

  public async Task<Models.User?> GetById(Guid aId)
  {
    return await GetOneByFilter(user => user.Id == aId);
  }

  public async Task<Models.User> Create(RegisterDTO aDto)
  {
    if (await GetByEmail(aDto.Email) != null)
      throw new BadRequestException("Email in use");

    if (await GetByPhoneNumber(aDto.PhoneNumber) != null)
      throw new BadRequestException("Phone number in use");

    Models.User newUser = new()
    {
      Id = Guid.NewGuid(),
      Email = aDto.Email,
      Name = $"{aDto.FirstName} {aDto.LastName}",
      PhoneNumber = aDto.PhoneNumber,
      isTestAccount = aDto.isTestAccount,
      Password = Hashing.HashToString(aDto.Password),
      CreatedAt = DateTime.UtcNow.ToString("o")
    };

    _context.Add(newUser);
    await _context.SaveChangesAsync();

    return newUser;
  }

  public async Task Remove(Models.User user)
  {
    _context.Remove(user);
    await _context.SaveChangesAsync();
  }

  public async Task Remove(Guid? aId)
  {
    if (aId == null) return;

    var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == aId);
    if (user == null) return;

    _context.Remove(user);
    await _context.SaveChangesAsync();
  }
}