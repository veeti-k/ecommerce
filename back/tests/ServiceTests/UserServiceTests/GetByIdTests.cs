/*using System;
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

namespace tests.ServiceTests.UserServiceTests;

public class GetByIdTests
{
  private readonly IMapper _mapper;
  private readonly IUserService _userService;
  private readonly Mock<IUserRepo> _mockUserRepo = new();
  private readonly Mock<IHttpContextAccessor> _mockAccessor = new();

  public GetByIdTests()
  {
    var mapperConf = new MapperConfiguration(config => config
      .AddProfile(new DomainToResponseMappingProfile()));
    _mapper = mapperConf.CreateMapper();

    IContextService contextService = new ContextService(_mockAccessor.Object);
    _userService = new UserService(_mapper, _mockUserRepo.Object, contextService);
  }

  [Fact]
  public async Task GetById_WithExistingUser_DoesNotThrow_ReturnsExistingUser()
  {
    var existingUser = Users.CreateFakeUser();

    _mockUserRepo.Setup(repo => repo
        .GetById(It.IsAny<int>()))
      .ReturnsAsync(existingUser);

    Func<Task<UserResponse>> test = async () => await _userService.GetById(existingUser.Id);

    await test.Should().NotThrowAsync();
    var result = await test();

    result.Should().BeEquivalentTo(_mapper.Map<UserResponse>(existingUser));
  }

  [Fact]
  public async Task GetById_WithNoExistingUser_ThrowsNotFoundException()
  {
    _mockUserRepo.Setup(repo => repo
        .GetById(It.IsAny<int>()))
      .ReturnsAsync((User) null);

    Func<Task<UserResponse>> test = async () => await _userService.GetById(23);

    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "User not found"
      });
  }
}*/