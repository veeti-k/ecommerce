using System;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.Auth.Login;
using api.Security;
using FluentAssertions;
using tests.UtilsForTesting;
using Xunit;

namespace tests.EndpointIntegrationTests.Auth;

public class LoginTests : AuthIntegrationTest
{
  [Fact]
  public async Task Login_WithCorrectCredentials_Succeeds()
  {
    var user = DbSeeding.GetUser(Flags.NO_FLAGS);

    var dto = new LoginDto()
    {
      Email = user.Email,
      Password = user.Password
    };

    var response = await Login_TEST_REQUEST(dto);

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<LoginResponse>();

    json.AccessToken.Length.Should().BeGreaterThan(50);
  }

  [Fact]
  public async Task Login_WithInCorrectEmail_ReturnsUserNotFound()
  {
    var dto = new LoginDto()
    {
      Email = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString()
    };

    var response = await Login_TEST_REQUEST(dto);

    response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be("User not found");
  }

  [Fact]
  public async Task Login_WithCorrectEmail_WithIncorrectPassword_ReturnsUnauthorized_InvalidPassword()
  {
    var user = DbSeeding.GetUser(Flags.NO_FLAGS);

    var dto = new LoginDto()
    {
      Email = user.Email,
      Password = Guid.NewGuid().ToString()
    };

    var response = await Login_TEST_REQUEST(dto);

    response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be("Invalid password");
  }
}