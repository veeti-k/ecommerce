using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Services;
using api.Services.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ServiceTests.AddressServiceTests;

public class GetManyTests
{
  private readonly Mock<IAddressRepo> _mockAddressRepo = new();
  private readonly IAddressService _addressService;
  private readonly int randomNumber = new Random().Next(1, Int32.MaxValue);

  public GetManyTests()
  {
    _addressService = new AddressService(_mockAddressRepo.Object);
  }

  [Fact]
  public async Task GetMany_WithExistingAddresses_ReturnsAddresses()
  {
    var userId = randomNumber;

    var existingAddresses = new List<Address>()
    {
      Addresses.CreateFakeAddress(userId),
      Addresses.CreateFakeAddress(userId),
      Addresses.CreateFakeAddress(userId),
    };

    _mockAddressRepo.Setup(mock => mock
        .GetManyByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync(existingAddresses);

    var addresses = await _addressService.GetMany(userId);

    addresses.Count().Should().Be(existingAddresses.Count());
    addresses.Should().BeEquivalentTo(existingAddresses);
  }
  
  [Fact]
  public async Task GetMany_WithNoExistingAddresses_ThrowsNotFoundException()
  {
    var userId = randomNumber;

    _mockAddressRepo.Setup(mock => mock
        .GetManyByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync(Enumerable.Empty<Address>());

    Func<Task<IEnumerable<Address>>> test = async () => await _addressService.GetMany(userId);
    
    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "No addresses found"
      });
  }
}