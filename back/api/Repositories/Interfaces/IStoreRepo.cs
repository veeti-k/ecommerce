using api.Models;

namespace api.Repositories.Interfaces;

public interface IStoreRepo : IGenericRepo<Store>
{
  public Task<List<Store>> GetManyStores();
}