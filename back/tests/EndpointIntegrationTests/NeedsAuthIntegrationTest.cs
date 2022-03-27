using System;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Endpoints;
using api.RequestsAndResponses.Auth.Login;
using tests.UtilsForTesting;

namespace tests.EndpointIntegrationTests;

public class NeedsAuthIntegrationTest : BaseIntegrationTest
{
  protected async Task<string> Login(string email, string password)
  {
    var response = await TestClient.PostAsJsonAsync(Routes.Auth.Login, new LoginDto
    {
      Email = email,
      Password = password
    });

    var json = await response.Content.ReadFromJsonAsync<LoginResponse>();
    if (json.AccessToken is null) throw new Exception("Authentication failed, access token was not returned from login");

    return json.AccessToken;
  }

  protected async Task Logout()
  {
    await TestClient.PostAsync(Routes.Auth.Logout, null);
    TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "");
  }

  protected async Task LoginToAdmin()
  {
    TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",
      await Login(DbSeeding.AdminUser.Email, DbSeeding.AdminUser.Password));
  }
  
  protected async Task LoginToNonAdmin()
  {
    TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",
      await Login(DbSeeding.NonAdminUser.Email, DbSeeding.NonAdminUser.Password));
  }
}