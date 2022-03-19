using System;
using System.Collections.Generic;
using System.Linq;
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

public class GetUserAddressesTests
{
  private readonly Mock<IAddressRepo> _mockAddressRepo = new();
  private readonly IAddressService _addressService;
  private readonly IMapper _mapper;
  private readonly int randomNumber = new Random().Next(1, Int32.MaxValue);

  public GetUserAddressesTests()
  {
    var mapperConf = new MapperConfiguration(config => config
      .AddProfile(new DomainToResponseMappingProfile()));
    _mapper = mapperConf.CreateMapper();
    
    _addressService = new AddressService(_mockAddressRepo.Object, _mapper);
  }

  [Fact]
  public async Task GetUserAddresses_WithExistingAddresses_ReturnsAddresses()
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

    var addresses = await _addressService.GetUserAddresses(userId);

    addresses.Count().Should().Be(existingAddresses.Count());
    addresses.Should().BeEquivalentTo(_mapper.Map<IEnumerable<AddressResponse>>(existingAddresses));
  }
  
  [Fact]
  public async Task GetUserAddresses_WithNoExistingAddresses_ThrowsNotFoundException()
  {
    var userId = randomNumber;

    _mockAddressRepo.Setup(mock => mock
        .GetManyByFilter(It.IsAny<Expression<Func<Address, bool>>>()))
      .ReturnsAsync(Enumerable.Empty<Address>());

    Func<Task<IEnumerable<AddressResponse>>> test = async () => await _addressService.GetUserAddresses(userId);
    
    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "No addresses found"
      });
  }
}