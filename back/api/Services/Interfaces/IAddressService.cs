using api.DTOs;
using api.Models.User;

namespace api.Services.Interfaces;

public interface IAddressService
{
  public Task<Address> GetById(Guid id, bool require);
  public Task<IEnumerable<Address>> GetMany(int userId);
  public Task<Address> GetOne(Guid addressId, int userId);
  public Task<Address> Create(CreateAddressDTO aDto, int userId);
  public Task<Address> Update(UpdateAddressDTO dto, int userId, Guid addressId);
  public Task Remove(Address aAddress);
  public Task Remove(Guid addressId);
}