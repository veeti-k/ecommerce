using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.User;

public class Repo : IRepo
{
  private readonly DataContext _context;

  public Repo(DataContext context)
  {
    _context = context;
  }

  public async Task<Models.User> GetOneById(Guid aId)
  {
    return await _context.Users
      .Include(user => user.Addresses)
      .Select(user => new Models.User()
      {
        Id = user.Id,
        Name = user.Name,
        Email = user.Email,
        Password = user.Password,
        PhoneNumber = user.PhoneNumber,
        CreatedAt = user.CreatedAt,
        LastAccessedAt = user.LastAccessedAt,
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
      }).FirstOrDefaultAsync(user => user.Id == aId);
  }
}