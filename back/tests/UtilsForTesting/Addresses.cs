using System;
using api.Models.User;
using api.RequestsAndResponses.Addresses.Add;
using api.RequestsAndResponses.Addresses.MeUpdate;

namespace tests.UtilsForTesting;

public static class Addresses
{
  public static Address CreateFakeAddress(int userId)
  {
    return new()
    {
      AddressId = Guid.NewGuid(),
      City = Guid.NewGuid().ToString(),
      Email = Guid.NewGuid().ToString(),
      StreetAddress = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      State = Guid.NewGuid().ToString(),
      PhoneNumber = Guid.NewGuid().ToString(),
      UserId = userId,
      Zip = Guid.NewGuid().ToString(),
    };
  }
  
  public static Address CreateFakeAddressFromDto(AddAddressDto dto, int userId) =>
    new Address
    {
      AddressId = Guid.NewGuid(),
      City = dto.City,
      Email = dto.Email,
      StreetAddress = dto.StreetAddress,
      Name = dto.Name,
      State = dto.State,
      PhoneNumber = dto.PhoneNumber,
      UserId = userId,
      Zip = dto.Zip,
    };
  
  public static Address CreateFakeAddressFromDto(UpdateAddressDto dto, int userId) =>
    new Address
    {
      AddressId = Guid.NewGuid(),
      City = dto.City,
      Email = dto.Email,
      StreetAddress = dto.StreetAddress,
      Name = dto.Name,
      State = dto.State,
      PhoneNumber = dto.PhoneNumber,
      UserId = userId,
      Zip = dto.Zip,
    };
  
  public static AddAddressDto CreateFakeAddAddressDTO()
  {
    return new()
    {
      City = Guid.NewGuid().ToString(),
      Email = Guid.NewGuid().ToString(),
      StreetAddress = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      State = Guid.NewGuid().ToString(),
      PhoneNumber = Guid.NewGuid().ToString(),
      Zip = Guid.NewGuid().ToString(),
    };
  }
  
  public static UpdateAddressDto CreateFakeUpdateAddressDTO()
  {
    return new()
    {
      City = Guid.NewGuid().ToString(),
      Email = Guid.NewGuid().ToString(),
      StreetAddress = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      State = Guid.NewGuid().ToString(),
      PhoneNumber = Guid.NewGuid().ToString(),
      Zip = Guid.NewGuid().ToString(),
    };
  }
}