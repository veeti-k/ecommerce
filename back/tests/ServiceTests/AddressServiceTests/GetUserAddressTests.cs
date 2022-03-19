using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.Exceptions;
using api.Mapping;
using api.Mapping.MappedTypes;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Services;
using api.Services.Interfaces;
using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ServiceTests.AddressServiceTests;

public class GetUserAddressTests
{
  private readonly Mock<IAddressRepo> _mockAddressRepo = new();
  private readonly IAddressService _addressService;
  private readonly IMapper _mapper;
  private readonly int randomNumber = new Random().Next(1, Int32.MaxValue);

  public GetUserAddressTests()
  {
    var mapperConf = new MapperConfiguration(config => config
      .AddProfile(new DomainToResponseMappingProfile()));
    _mapper = mapperConf.CreateMapper();
    
    _addressService = new AddressService(_mockAddressRepo.Object, _mapper);
  }

  [Fact]
  public async Task GetUserAddress_WithExistingAddress_ReturnsAddress()
  {
    var userId = randomNumber;

    var existingAddress = Addresses.CreateFakeAddress(userId);

    _mockAddressRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync(existingAddress);

    var address = await _addressService.GetUserAddress(existingAddress.Id, userId);

    address.Should().BeEquivalentTo(_mapper.Map<AddressResponse>(existingAddress));
  }

  [Fact]
  public async Task GetUserAddress_WithNoExistingAddresses_ThrowsNotFoundException()
  {
    var userId = randomNumber;

    _mockAddressRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync((Address) null);

    Func<Task<AddressResponse>> test = async () => await _addressService.GetUserAddress(Guid.NewGuid(), userId);

    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "Address not found"
      });
  }
}