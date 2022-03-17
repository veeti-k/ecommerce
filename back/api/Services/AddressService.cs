using System.Linq.Expressions;
using api.DTOs;
using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Services.Interfaces;

namespace api.Services;

public class AddressService : IAddressService
{
  private readonly IAddressRepo _addressRepo;

  public AddressService(IAddressRepo addressRepo)
  {
    _addressRepo = addressRepo;
  }

  private async Task<Address> GetOneByFilter(Expression<Func<Address, bool>> filter, bool require)
  {
    var address = await _addressRepo.GetOneByFilter(filter);
    if (require && address == null) throw new NotFoundException("Address not found");

    return address;
  }

  private async Task<IEnumerable<Address>> GetManyByFilter(Expression<Func<Address, bool>> filter, bool require)
  {
    var addresses = await _addressRepo.GetManyByFilter(filter);
    if (require && !addresses.Any()) throw new NotFoundException("No addresses found");

    return addresses;
  }

  public async Task<Address> GetById(Guid addressId, bool require) =>
    await GetOneByFilter(address => address.Id == addressId, require);

  public async Task<IEnumerable<Address>> GetMany(int userId) =>
    await GetManyByFilter(address => address.UserId == userId, require: true);

  public async Task<Address> GetOne(Guid addressId, int userId) =>
    await GetOneByFilter(address => address.UserId == userId
                                    && address.Id == addressId, require: true);

  public async Task<Address> Create(CreateAddressDTO aDto, int userId)
  {
    Address newAddress = new()
    {
      Id = Guid.NewGuid(),
      UserId = userId,
      Name = aDto.Name,
      PhoneNumber = aDto.PhoneNumber,
      Email = aDto.Email,
      Line1 = aDto.Line1,
      Line2 = aDto.Line2,
      City = aDto.City,
      State = aDto.State,
      Zip = aDto.Zip
    };

    await _addressRepo.Add(newAddress);
    return newAddress;
  }

  public async Task<Address> Update(UpdateAddressDTO dto, int userId, Guid addressId)
  {
    var existingAddress = await GetOne(addressId, userId);

    existingAddress.Name = dto.Name ?? existingAddress.Name;
    existingAddress.City = dto.City ?? existingAddress.City;
    existingAddress.Email = dto.Email ?? existingAddress.Email;
    existingAddress.Line1 = dto.Line1 ?? existingAddress.Line1;
    existingAddress.Line2 = dto.Line2 ?? existingAddress.Line2;
    existingAddress.State = dto.State ?? existingAddress.State;
    existingAddress.PhoneNumber = dto.PhoneNumber ?? existingAddress.PhoneNumber;
    existingAddress.Zip = dto.Zip ?? existingAddress.Zip;

    await _addressRepo.Update(existingAddress);

    return existingAddress;
  }

  public async Task Remove(Address address)
  {
    var addressToRemove = await GetById(address.Id, require: true);
    await _addressRepo.Remove(addressToRemove);
  }

  public async Task Remove(Guid addressId)
  {
    var addressToRemove = await GetById(addressId, require: true);
    await _addressRepo.Remove(addressToRemove);
  }
}