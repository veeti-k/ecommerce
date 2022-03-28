using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Endpoints;
using api.RequestsAndResponses.Auth.Login;
using api.Security;
using FluentAssertions;
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
    if (json.AccessToken is null)
      throw new Exception("Authentication failed, access token was not returned from login");

    return json.AccessToken;
  }

  protected async Task Logout()
  {
    await TestClient.PostAsync(Routes.Auth.Logout, null);
    TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "");
  }

  protected async Task LoginAs(Flags1 flags)
  {
    var user = DbSeeding.GetUser(flags);
    if (user is null) throw new Exception("User can't be null");

    var loginDto = new LoginDto
    {
      Email = user.Email,
      Password = user.Password
    };

    var response = await TestClient.PostAsync(Routes.Auth.Login, JsonContent.Create(loginDto));
    var json = await response.Content.ReadFromJsonAsync<LoginResponse>();

    var accessToken = json.AccessToken;
    accessToken.Length.Should().BeGreaterThan(10);

    TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
  }

  public async Task TestPermissions(Func<Task<HttpResponseMessage?>> function, List<Flags1> shouldPass)
  {
    List<Flags1> passingPerms = new List<Flags1>();
    int runs = 0;

    foreach (Flags1 flag in Enum.GetValues(typeof(Flags1)))
    {
      await LoginAs(flag);

      var response = await function();

      await Logout();

      if (response.StatusCode != HttpStatusCode.Unauthorized
          && response.StatusCode != HttpStatusCode.Forbidden)
        passingPerms.Add(flag);

      runs++;
    }

    // administrator should be allowed to do everything
    if (!shouldPass.Contains(Flags1.ADMINISTRATOR))
      shouldPass.Add(Flags1.ADMINISTRATOR);

    // if even the user with no flags should be allowed
    // then the passingPerms list's length should be 
    // the amount of flags 
    if (shouldPass.Contains(Flags1.NO_FLAGS))
    {
      passingPerms.Count.Should().Be(runs);
      return;
    }

    var illegallyPassing = passingPerms.Except(shouldPass).ToList();
    var notPassingWhenShould = shouldPass.Except(passingPerms).ToList();

    if (illegallyPassing.Any())
      throw new Exception(
        $"Some permissions that aren't allowed through had access.\n\nIllegally had access:\n{string.Join(", ", illegallyPassing)}\n\nExpected to have access:\n{string.Join(", ", shouldPass)}\n\nActually had access:\n{string.Join(", ", passingPerms)}\n");

    if (notPassingWhenShould.Any())
      throw new Exception(
        $"Some permissions that are allowed through didn't have access.\n\nDidn't have access when should've had:\n{string.Join(", ", notPassingWhenShould)}\n\nExpected to have access:\n{string.Join(", ", shouldPass)}\n\nActually had access:\n{string.Join(", ", passingPerms)}\n");
  }
}