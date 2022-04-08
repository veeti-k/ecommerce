using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Endpoints;
using api.RequestsAndResponses.Auth.Login;
using api.RequestsAndResponses.Auth.Register;
using FluentAssertions;
using tests.UtilsForTesting;
using Xunit;

namespace tests.EndpointIntegrationTests;

public class AuthIntegrationTest : BaseIntegrationTest
{
  public static readonly RegisterDto TestRegisterDto = new()
  {
    Email = Guid.NewGuid().ToString(),
    Name = Guid.NewGuid().ToString(),
    Password = Guid.NewGuid().ToString(),
    isTestAccount = false,
    PhoneNumber = Guid.NewGuid().ToString()
  };

  public async Task<HttpResponseMessage?> Register_TEST_REQUEST(RegisterDto dto)
  {
    var path = Routes.Auth.Register;

    var response = await TestClient.PostAsync(path, JsonContent.Create(dto));
    
    return response;
  }

  public async Task<RegisterResponse> Register()
  {
    var response = await Register_TEST_REQUEST(TestRegisterDto);

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<RegisterResponse>();

    return json;
  }

  public async Task<HttpResponseMessage?> Login_TEST_REQUEST(LoginDto dto)
  {
    var path = Routes.Auth.Login;

    var response = await TestClient.PostAsync(path, JsonContent.Create(dto));

    return response;
  }
}