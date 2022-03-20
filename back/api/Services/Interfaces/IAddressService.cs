using api.DTOs;
using api.Mapping.MappedTypes;

namespace api.Services.Interfaces;

public interface IAddressService
{
  public Task<AddressResponse> GetUserAddress(Guid addressId, int userId);
  public Task<IEnumerable<AddressResponse>> GetUserAddresses(int userId);
  public Task<AddressResponse> Create(CreateAddressDTO aDto, int userId);
  public Task<AddressResponse> Update(UpdateAddressDTO dto, int userId, Guid addressId);
  public Task Remove(Guid addressId);
}