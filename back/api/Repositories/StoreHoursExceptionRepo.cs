using api.Data;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class StoreHoursExceptionRepo : GenericRepo<StoreHoursException>, IStoreHoursExceptionRepo
{
  private readonly DataContext _context;

  public StoreHoursExceptionRepo(DataContext context) : base(context)
  {
    _context = context;
  }

  public async Task<StoreHoursException?> GetByDate(Guid storeId, Guid exceptionId, DateTime date)
  {
    return await _context.StoreHoursExceptions
      .FirstOrDefaultAsync(x => x.StoreId == storeId
                                && x.StoreHoursExceptionId == exceptionId
                                && x.Date == date);
  }
}