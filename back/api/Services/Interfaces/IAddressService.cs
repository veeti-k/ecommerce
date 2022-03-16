using api.DTOs;
using api.Models;

namespace api.Services.Interfaces;

public interface IAddressService
{
  public Task<Address> GetById(Guid id, bool require);
  public Task<IEnumerable<Address>> GetMany(Guid aUserId);
  public Task<Address> GetOne(Guid aAddressId, Guid aUserId);
  public Task<Address> Create(CreateAddressDTO aDto, Guid aUserId);
  public Task<Address> Update(UpdateAddressDTO dto, Guid userId, Guid addressId);
  public Task Remove(Address aAddress);
  public Task Remove(Guid id);
}