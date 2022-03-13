using System;
using System.Threading.Tasks;
using api.Controllers;
using api.DTOs;
using api.Mapping;
using api.Models;
using api.Repositories.User;
using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ControllerTests.UserControllerTests;

public class GetMeTests
{
  private readonly Mock<IUserRepo> _mockUserRepo = new();
  private readonly IMapper _mapper;

  public GetMeTests()
  {
    if (_mapper == null)
    {
      var config = new MapperConfiguration(config => { config.AddProfile(new DomainToResponseMappingProfile()); });
      IMapper mapper = config.CreateMapper();
      _mapper = mapper;
    }
  }

  [Fact]
  public async Task GetMe_WithExistingUser_ReturnsExistingUser_InCorrectFormat()
  {
    var existingUser = Users.CreateFakeUser();

    _mockUserRepo.Setup(repo => repo
        .GetById(It.IsAny<Guid>()))
      .ReturnsAsync(existingUser);

    var fakeContext = new DefaultHttpContext
    {
      User = Identity.CreateFakeClaimsPrincipal(existingUser.Id, Guid.NewGuid())
    };

    var controller = new UserController(_mockUserRepo.Object, _mapper)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.GetMe();

    (result.Result as OkObjectResult)
      .StatusCode
      .Should().Be(StatusCodes.Status200OK);

    (result.Result as OkObjectResult)
      .Value
      .Should().BeEquivalentTo(_mapper.Map<UserResponse>(existingUser));
  }

  [Fact]
  public async Task GetMe_WithNoExistingUser_ReturnsNotFound_ReturnsCorrectMessage()
  {
    var userId = Guid.NewGuid();
    var existingUser = Users.CreateFakeUser(userId ,addresses:new []
    {
      Addresses.CreateFakeAddress(userId),
      Addresses.CreateFakeAddress(userId),
      Addresses.CreateFakeAddress(userId),
    });
    
    _mockUserRepo.Setup(repo => repo
        .GetById(It.IsAny<Guid>()))
      .ReturnsAsync((User) null);

    var fakeContext = new DefaultHttpContext
    {
      User = Identity.CreateFakeClaimsPrincipal(existingUser.Id, Guid.NewGuid())
    };

    var controller = new UserController(_mockUserRepo.Object, _mapper)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.GetMe();

    (result.Result as NotFoundObjectResult)
      .StatusCode
      .Should().Be(StatusCodes.Status404NotFound);

    (result.Result as NotFoundObjectResult)
      .Value
      .Should().Be("User not found");
  }
}