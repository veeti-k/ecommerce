using System;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.Auth.Register;
using api.Security;
using FluentAssertions;
using tests.UtilsForTesting;
using Xunit;

namespace tests.EndpointIntegrationTests.AuthTests;

public class RegisterTests : AuthIntegrationTest
{
  [Fact]
  public async Task Register_WithUniqueEmail_WithUniquePhoneNumber_Succeeds()
  {
    var dto = new RegisterDto()
    {
      Email = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
      isTestAccount = false,
      PhoneNumber = Guid.NewGuid().ToString()
    };

    var response = await Register_TEST_REQUEST(dto);

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<RegisterResponse>();

    json.AccessToken.Length.Should().BeGreaterThan(50);
  }
  
  [Fact]
  public async Task Register_WithTakenEmail_ReturnsBadRequest_EmailInUse()
  {
    var user = DbSeeding.GetUser(Flags.NO_FLAGS);
    
    var dto = new RegisterDto()
    {
      Email = user.Email,
      Name = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
      isTestAccount = false,
      PhoneNumber = Guid.NewGuid().ToString()
    };

    var response = await Register_TEST_REQUEST(dto);

    response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be("Email already in use");
  }
  
  [Fact]
  public async Task Register_WithUniqueEmail_WithTakenPhoneNumber_ReturnsBadRequest_PhoneNumberInUse()
  {
    var user = DbSeeding.GetUser(Flags.NO_FLAGS);
    
    var dto = new RegisterDto()
    {
      Email = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
      isTestAccount = false,
      PhoneNumber = user.PhoneNumber
    };

    var response = await Register_TEST_REQUEST(dto);

    response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be("Phone number already in use");
  }
}