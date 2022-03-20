using api.DTOs;
using api.Exceptions;
using api.Mapping.MappedTypes;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Services.Interfaces;
using AutoMapper;

namespace api.Services;

public class AddressService : IAddressService
{
  private readonly IAddressRepo _addressRepo;
  private readonly IMapper _mapper;

  public AddressService(IAddressRepo addressRepo, IMapper aMapper)
  {
    _addressRepo = addressRepo;
    _mapper = aMapper;
  }

  public async Task<AddressResponse> GetUserAddress(Guid addressId, int userId)
  {
    var address = await _addressRepo.GetOneByFilter(address => address.Id == addressId && address.UserId == userId);
    if (address is null) throw new NotFoundException("Address not found");

    return _mapper.Map<AddressResponse>(address);
  }

  public async Task<IEnumerable<AddressResponse>> GetUserAddresses(int userId)
  {
    var addresses = await _addressRepo.GetManyByFilter(address => address.UserId == userId);
    if (!addresses.Any()) throw new NotFoundException("No addresses found");

    return _mapper.Map<IEnumerable<AddressResponse>>(addresses);
  }

  public async Task<AddressResponse> Create(CreateAddressDTO aDto, int userId)
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

    var created = await _addressRepo.Add(newAddress);
    return _mapper.Map<AddressResponse>(created);
  }

  public async Task<AddressResponse> Update(UpdateAddressDTO dto, int userId, Guid addressId)
  {
    var existingAddress = await _addressRepo
      .GetOneByFilter(address => address.Id == addressId && address.UserId == userId);

    if (existingAddress is null) throw new NotFoundException("Address not found");

    existingAddress.Name = dto.Name ?? existingAddress.Name;
    existingAddress.City = dto.City ?? existingAddress.City;
    existingAddress.Email = dto.Email ?? existingAddress.Email;
    existingAddress.Line1 = dto.Line1 ?? existingAddress.Line1;
    existingAddress.Line2 = dto.Line2 ?? existingAddress.Line2;
    existingAddress.State = dto.State ?? existingAddress.State;
    existingAddress.PhoneNumber = dto.PhoneNumber ?? existingAddress.PhoneNumber;
    existingAddress.Zip = dto.Zip ?? existingAddress.Zip;

    var updated = await _addressRepo.Update(existingAddress);

    return _mapper.Map<AddressResponse>(updated);
  }

  public async Task Remove(Guid addressId)
  {
    var addressToRemove = await _addressRepo.GetOneByFilter(address => address.Id == addressId);
    if (addressToRemove is null) throw new NotFoundException("Address not found");

    addressToRemove.IsDeleted = true;

    await _addressRepo.Update(addressToRemove);
  }
}