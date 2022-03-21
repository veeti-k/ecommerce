﻿using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.Exceptions;
using api.Mapping;
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

public class RemoveTests
{
  private readonly IUserService _userService;
  private readonly Mock<IUserRepo> _mockUserRepo = new();
  private readonly Mock<IHttpContextAccessor> _mockAccessor = new();

  public RemoveTests()
  {
    var mapperConf = new MapperConfiguration(config => config
      .AddProfile(new DomainToResponseMappingProfile()));
    var mapper = mapperConf.CreateMapper();

    IContextService contextService = new ContextService(_mockAccessor.Object);
    _userService = new UserService(mapper, _mockUserRepo.Object, contextService);
  }

  [Fact]
  public async Task Remove_WithUserId_WithExistingUser_DoesNotThrow()
  {
    var existingUser = Users.CreateFakeUser();

    _mockUserRepo.Setup(repo => repo
        .GetById(It.IsAny<int>()))
      .ReturnsAsync(existingUser);

    Func<Task> test = async () => await _userService.Remove(3);

    await test.Should().NotThrowAsync();
    
    _mockUserRepo.Verify(mock => mock
      .Remove(It.IsAny<User>()), Times.Once);
  }

  [Fact]
  public async Task Remove_WithUserId_WithNoExistingUser_ThrowsNotFoundException()
  {
    _mockUserRepo.Setup(repo => repo
        .GetById(It.IsAny<int>()))
      .ReturnsAsync((User) null);

    Func<Task> test = async () => await _userService.Remove(3);

    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "User not found"
      });
    
    _mockUserRepo.Verify(mock => mock
      .Remove(It.IsAny<User>()), Times.Never);
  }
}