using System;
using System.Threading.Tasks;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Services;
using api.Services.Interfaces;
using FluentAssertions;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ServiceTests.AddressServiceTests;

public class CreateTests
{
  private readonly Mock<IAddressRepo> _mockAddressRepo = new();
  private readonly IAddressService _addressService;

  public CreateTests()
  {
    _addressService = new AddressService(_mockAddressRepo.Object);
  }

  [Fact]
  public async Task Create_CreatesNewAddress_ReturnsCorrectAddress()
  {
    var userId = Guid.NewGuid();
    var testDto = Addresses.CreateFakeCreateAddressDTO();

    var address = await _addressService.Create(testDto, userId);
    
    _mockAddressRepo.Verify(mock => mock
      .Add(It.IsAny<Address>()), Times.Once);

    address.Should().BeOfType<Address>();
    address.Should().BeEquivalentTo(testDto);
  }
}