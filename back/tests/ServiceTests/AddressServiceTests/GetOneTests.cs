using System;
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

public class GetOneTests
{
  private readonly Mock<IAddressRepo> _mockAddressRepo = new();
  private readonly IAddressService _addressService;

  public GetOneTests()
  {
    _addressService = new AddressService(_mockAddressRepo.Object);
  }

  [Fact]
  public async Task GetOne_WithExistingAddresses_ReturnsAddresses()
  {
    var userId = Guid.NewGuid();

    var existingAddress = Addresses.CreateFakeAddress(userId);
      
      _mockAddressRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync(existingAddress);

    var addresses = await _addressService.GetOne(existingAddress.Id, userId);

    addresses.Should().BeEquivalentTo(existingAddress);
  }

  [Fact]
  public async Task GetOne_WithNoExistingAddresses_ThrowsNotFoundException()
  {
    var userId = Guid.NewGuid();

    _mockAddressRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync((Address) null);

    Func<Task<Address>> test = async () => await _addressService.GetOne(Guid.NewGuid(),userId);

    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "Address not found"
      });
  }
}