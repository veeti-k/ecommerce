using api.Data;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class StoreRepo : GenericRepo<Store>, IStoreRepo
{
  private readonly DataContext _context;

  public StoreRepo(DataContext context) : base(context)
  {
    _context = context;
  }

  public async Task<List<Store>> GetManyStores()
  {
    return await _context.Stores
      .AsNoTracking()
      .Include(store => store.DefaultStoreHours)
      .Include(store => store.StoreHoursExceptions)
      .Include(store => store.StoreStocks)
      .ToListAsync();
  }
}