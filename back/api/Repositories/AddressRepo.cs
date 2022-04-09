using api.Data;
using api.Models.User;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class AddressRepo : GenericRepo<Address>, IAddressRepo
{
  private readonly DataContext _context;

  public AddressRepo(DataContext context) : base(context)
  {
    _context = context;
  }

  public async Task<Address?> GetOne(int userId, Guid addressId)
  {
    return await _context.Addresses
      .Where(address => address.Id == addressId
                        && address.UserId == userId)
      .FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<Address?>> GetMany(int userId)
  {
    return await _context.Addresses
      .Where(address => address.UserId == userId)
      .ToListAsync();
  }
}