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

public class RemoveTests
{
  private readonly Mock<IAddressRepo> _mockAddressRepo = new();
  private readonly IAddressService _addressService;
  private readonly int randomNumber = new Random().Next(1, Int32.MaxValue);

  public RemoveTests()
  {
    _addressService = new AddressService(_mockAddressRepo.Object);
  }

  [Fact]
  public async Task Remove_WithExistingAddress_RemovesAddress()
  {
    var existingAddress = Addresses.CreateFakeAddress(randomNumber);

    _mockAddressRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync(existingAddress);

    await _addressService.Remove(existingAddress.Id);

    _mockAddressRepo.Verify(mock => mock
      .Remove(It.IsAny<Address>()), Times.Once);
  }

  [Fact]
  public async Task Remove_WithNoExistingAddress_ThrowsNotFoundException()
  {
    _mockAddressRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync((Address) null);


    Func<Task> test = async () => await _addressService.Remove(Guid.NewGuid());

    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "Address not found"
      });

    _mockAddressRepo.Verify(mock => mock
      .Remove(It.IsAny<Address>()), Times.Never);
  }
}