using System;
using api.DTOs;
using api.Models.User;

namespace tests.ControllerTests.Utils;

public static class Addresses
{
  public static Address CreateFakeAddress(int userId)
  {
    return new()
    {
      Id = Guid.NewGuid(),
      City = Guid.NewGuid().ToString(),
      Email = Guid.NewGuid().ToString(),
      Line1 = Guid.NewGuid().ToString(),
      Line2 = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      State = Guid.NewGuid().ToString(),
      PhoneNumber = Guid.NewGuid().ToString(),
      UserId = userId,
      Zip = Guid.NewGuid().ToString(),
    };
  }
  
  public static CreateAddressDTO CreateFakeCreateAddressDTO()
  {
    return new()
    {
      City = Guid.NewGuid().ToString(),
      Email = Guid.NewGuid().ToString(),
      Line1 = Guid.NewGuid().ToString(),
      Line2 = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      State = Guid.NewGuid().ToString(),
      PhoneNumber = Guid.NewGuid().ToString(),
      Zip = Guid.NewGuid().ToString(),
    };
  }
  
  public static UpdateAddressDTO CreateFakeUpdateAddressDTO()
  {
    return new()
    {
      City = Guid.NewGuid().ToString(),
      Email = Guid.NewGuid().ToString(),
      Line1 = Guid.NewGuid().ToString(),
      Line2 = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      State = Guid.NewGuid().ToString(),
      PhoneNumber = Guid.NewGuid().ToString(),
      Zip = Guid.NewGuid().ToString(),
    };
  }
}