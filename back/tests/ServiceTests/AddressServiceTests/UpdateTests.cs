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

public class UpdateTests
{
  private readonly Mock<IAddressRepo> _mockAddressRepo = new();
  private readonly IAddressService _addressService;
  private readonly int randomNumber = new Random().Next(1, Int32.MaxValue);

  public UpdateTests()
  {
    _addressService = new AddressService(_mockAddressRepo.Object);
  }

  [Fact]
  public async Task Update_WithExistingAddress_UpdatesAddress_ReturnsUpdatedAddress()
  {
    var userId = randomNumber;
    var existingAddress = Addresses.CreateFakeAddress(userId);
    var testDto = Addresses.CreateFakeUpdateAddressDTO();

    _mockAddressRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync(existingAddress);

    var updated = await _addressService.Update(testDto, userId, existingAddress.Id);

    _mockAddressRepo.Verify(mock => mock
      .Update(It.IsAny<Address>()), Times.Once);

    updated.Name.Should().Be(testDto.Name);
    updated.City.Should().Be(testDto.City);
    updated.Email.Should().Be(testDto.Email);
    updated.Line1.Should().Be(testDto.Line1);
    updated.Line2.Should().Be(testDto.Line2);
    updated.State.Should().Be(testDto.State);
    updated.PhoneNumber.Should().Be(testDto.PhoneNumber);
    updated.Zip.Should().Be(testDto.Zip);

    existingAddress.Name.Should().Be(testDto.Name);
    existingAddress.City.Should().Be(testDto.City);
    existingAddress.Email.Should().Be(testDto.Email);
    existingAddress.Line1.Should().Be(testDto.Line1);
    existingAddress.Line2.Should().Be(testDto.Line2);
    existingAddress.State.Should().Be(testDto.State);
    existingAddress.PhoneNumber.Should().Be(testDto.PhoneNumber);
    existingAddress.Zip.Should().Be(testDto.Zip);
  }

  [Fact]
  public async Task Update_WithNoExistingAddress_ThrowsNotFoundException()
  {
    var userId = randomNumber;
    var testDto = Addresses.CreateFakeUpdateAddressDTO();

    _mockAddressRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync((Address) null);

    Func<Task<Address>> test = async () => await _addressService.Update(testDto, userId, Guid.NewGuid());

    _mockAddressRepo.Verify(mock => mock
      .Update(It.IsAny<Address>()), Times.Never);

    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "Address not found"
      });
  }
}