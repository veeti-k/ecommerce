using api.Models;

namespace api.Repositories.Interfaces;

public interface IDefaultStoreHoursRepo : IGenericRepo<StoreDefaultHours>
{
  public Task<StoreDefaultHours?> GetByStoreId(Guid storeId);
}