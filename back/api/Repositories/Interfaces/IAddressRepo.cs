using api.Models.User;

namespace api.Repositories.Interfaces;

public interface IAddressRepo : IGenericRepo<Address>
{
  public Task<Address?> GetOne(int userId, Guid addressId);
  public Task<List<Address?>> GetMany(int userId);
}