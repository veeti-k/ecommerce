using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.DTOs.Auth;
using api.Exceptions;
using api.Models;
using api.Repositories.Interfaces;
using api.Services;
using api.Services.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ServiceTests.UserServiceTests;

public class CreateUserTests
{
  private readonly Mock<IUserRepo> _mockUserRepo = new();
  private readonly IUserService _userService;

  public CreateUserTests()
  {
    _userService = new UserService(_mockUserRepo.Object);
  }

  [Fact]
  public async Task Create_WithExistingEmail_ThrowsBadRequestException_WithRightDetails()
  {
    var existingUser = Users.CreateFakeUser();
    RegisterDTO testDto = new()
    {
      Email = "test@test.test",
      FirstName = Guid.NewGuid().ToString(),
      LastName = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
      PhoneNumber = "12345"
    };

    _mockUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    Func<Task> test = async () => await _userService.Create(testDto);

    (await test.Should().ThrowAsync<BadRequestException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status400BadRequest,
        Message = "Email in use"
      });

    _mockUserRepo.Verify(mock => mock
      .Add(It.IsAny<User>()), Times.Never);
  }

  [Fact]
  public async Task Create_WithExistingPhoneNumber_WithUniqueEmail_ThrowsBadRequestException_WithRightDetails()
  {
    var existingUser = Users.CreateFakeUser();
    RegisterDTO testDto = new()
    {
      Email = "test@test.test",
      FirstName = Guid.NewGuid().ToString(),
      LastName = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
      PhoneNumber = "12345"
    };

    _mockUserRepo.SetupSequence(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User) null)
      .ReturnsAsync(existingUser);

    Func<Task> test = async () => await _userService.Create(testDto);

    (await test.Should().ThrowAsync<BadRequestException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status400BadRequest,
        Message = "Phone number in use"
      });
    
    _mockUserRepo.Verify(mock => mock
      .Add(It.IsAny<User>()), Times.Never);
  }

  [Fact]
  public async Task Create_WithUniqueDetails_DoesNotThrow_ReturnsCreatedUser()
  {
    RegisterDTO testDto = new()
    {
      Email = "test@test.test",
      FirstName = Guid.NewGuid().ToString(),
      LastName = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
      PhoneNumber = "12345"
    };

    _mockUserRepo.SetupSequence(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User) null)
      .ReturnsAsync((User) null);

    Func<Task<User>> test = async () => await _userService.Create(testDto);

    var user = await test();
    
    _mockUserRepo.Verify(mock => mock
      .Add(It.IsAny<User>()), Times.Once);

    user.Email.Should().Be(testDto.Email);
    user.Name.Should().Be($"{testDto.FirstName} {testDto.LastName}");
    user.Password.Should().NotBeNullOrWhiteSpace();
    user.PhoneNumber.Should().Be(testDto.PhoneNumber);
    user.CreatedAt.Should().BeCloseTo(DateTimeOffset.UtcNow, TimeSpan.FromSeconds(5));
  }
}