using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.User;

public class Repo : IRepo
{
  private readonly DataContext _context;
  private readonly IQueryable<Models.User?> _populatedUsers;
  
  public Repo(DataContext context)
  {
    _context = context;
    _populatedUsers = _context.Users
      .Include(user => user.Addresses)
      .Select(user => new Models.User()
      {
        Id = user.Id,
        Name = user.Name,
        Email = user.Email,
        Password = user.Password,
        PhoneNumber = user.PhoneNumber,
        CreatedAt = user.CreatedAt,
        Addresses = user.Addresses.Select(address => new Address()
        {
          Id = address.Id,
          UserId = address.UserId,
          Name = address.Name,
          PhoneNumber = address.PhoneNumber,
          Email = address.Email,
          Line1 = address.Line1,
          Line2 = address.Line2,
          City = address.City,
          State = address.State,
          ZipCode = address.ZipCode
        })
      });
  }
  
  public async Task<Models.User> GetOneById(Guid aId)
  {
    return await _populatedUsers.FirstOrDefaultAsync(u => u.Id == aId);
  }
  
  public async Task<Models.User?> GetOneByEmail(string aEmail)
  {
    return await _populatedUsers.FirstOrDefaultAsync(u => u.Email == aEmail);
  }

  public async Task Add(Models.User user)
  {
    await _context.AddAsync(user);
    await _context.SaveChangesAsync();
  }
} 