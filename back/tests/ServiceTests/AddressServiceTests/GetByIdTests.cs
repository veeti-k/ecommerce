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

public class GetByIdTests
{
  private readonly Mock<IAddressRepo> _mockAddressRepo = new();
  private readonly IAddressService _addressService;
  private readonly int randomNumber = new Random().Next(1, Int32.MaxValue);

  public GetByIdTests()
  {
    _addressService = new AddressService(_mockAddressRepo.Object);
  }

  [Fact]
  public async Task GetById_WithExistingAddress_NotRequired_DoesNotThrow_ReturnsExistingAddress()
  {
    var userId = randomNumber;
    var existingAddress = Addresses.CreateFakeAddress(userId);

    _mockAddressRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync(existingAddress);

    Func<Task<Address>> test = async () => await _addressService.GetById(existingAddress.Id, require: true);

    await test.Should().NotThrowAsync();
    var result = await test();

    result.Should().BeSameAs(existingAddress);
    ;
  }

  [Fact]
  public async Task GetById_WithNoExistingAddress_NotRequired_DoesNotThrow_ReturnsNull()
  {
    _mockAddressRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync((Address) null);

    Func<Task<Address>> test = async () => await _addressService.GetById(Guid.NewGuid(), require: false);

    await test.Should().NotThrowAsync();
    var result = await test();

    result.Should().BeNull();
  }

  [Fact]
  public async Task GetById_WithNoExistingAddress_Required_ThrowsNotFoundException()
  {
    _mockAddressRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync((Address) null);

    Func<Task<Address>> test = async () => await _addressService.GetById(Guid.NewGuid(), require: true);

    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "Address not found"
      });
  }
}