using api.Models.User;
using api.Repositories.Interfaces;

namespace api.Repositories;

public interface IAddressRepo : IGenericRepo<Address>
{
  public Task<Address?> GetOne(int userId, Guid addressId);
  public Task<IEnumerable<Address?>> GetMany(int userId);
}