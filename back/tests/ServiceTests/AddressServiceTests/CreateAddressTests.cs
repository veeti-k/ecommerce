using System;
using System.Threading.Tasks;
using api.Mapping;
using api.Mapping.MappedTypes;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Services;
using api.Services.Interfaces;
using AutoMapper;
using FluentAssertions;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ServiceTests.AddressServiceTests;

public class CreateTests
{
  private readonly Mock<IAddressRepo> _mockAddressRepo = new();
  private readonly IAddressService _addressService;
  private readonly IMapper _mapper;
  private readonly int randomNumber = new Random().Next(1, Int32.MaxValue);

  public CreateTests()
  {
    var mapperConf = new MapperConfiguration(config => config
      .AddProfile(new DomainToResponseMappingProfile()));
    _mapper = mapperConf.CreateMapper();

    _addressService = new AddressService(_mockAddressRepo.Object, _mapper);
  }

  [Fact]
  public async Task Create_CreatesNewAddress_ReturnsCorrectAddress()
  {
    var userId = randomNumber;
    var testDto = Addresses.CreateFakeCreateAddressDTO();
    var createdAddress = Addresses.CreateFakeAddressFromDto(testDto, userId);

    _mockAddressRepo.Setup(mock => mock
        .Add(It.IsAny<Address>()))
      .ReturnsAsync(createdAddress);

    var address = await _addressService.Create(testDto, userId);

    _mockAddressRepo.Verify(mock => mock
      .Add(It.IsAny<Address>()), Times.Once);

    address.Should().BeOfType<AddressResponse>();
    address.Should().BeEquivalentTo(_mapper.Map<AddressResponse>(createdAddress));
  }
}