using api.Models;

namespace api.Repositories.Interfaces;

public interface IStoreHoursExceptionRepo : IGenericRepo<StoreHoursException>
{
  public Task<StoreHoursException?> GetByDate(Guid storeId, Guid exceptionId, DateTime date);
}