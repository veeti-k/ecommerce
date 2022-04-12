using api.Data;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class StoreDefaultHoursRepo : GenericRepo<StoreDefaultHours>, IDefaultStoreHoursRepo
{
  private readonly DataContext _context;
  
  public StoreDefaultHoursRepo(DataContext context) : base(context)
  {
    _context = context;
  }
  
  public async Task<StoreDefaultHours?> GetByStoreId(Guid storeId)
  {
    return await _context.DefaultStoreHours.FirstOrDefaultAsync(x => x.StoreId == storeId);
  }
}