using System.Linq.Expressions;
using api.Data;
using api.Models.User;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class AddressRepo : IAddressRepo
{
  private readonly DataContext _context;

  public AddressRepo(DataContext context)
  {
    _context = context;
  }
  
  public async Task<Address?> GetOneByFilter(Expression<Func<Address, bool>> aFilter)
  {
    return await _context.Addresses.Where(aFilter).FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<Address?>> GetManyByFilter(Expression<Func<Address, bool>> aFilter)
  {
    return await _context.Addresses.Where(aFilter).ToListAsync();
  }

  public async Task Add(Address aAddress)
  {
    _context.Add(aAddress);
    await _context.SaveChangesAsync();
  }

  public async Task Update(Address aAddress)
  {
    _context.Update(aAddress);
    await _context.SaveChangesAsync();
  }
}