using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api;
using api.Data;
using api.Endpoints;
using api.RequestsAndResponses.Auth.Login;
using api.Security;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using tests.UtilsForTesting;

namespace tests.EndpointIntegrationTests;

public static class TestThings
{
  public static WebApplicationFactory<Program> Test()
  {
    return new WebApplicationFactory<Program>()
      .WithWebHostBuilder(builder =>
      {
        builder.ConfigureServices(services =>
        {
          var descriptor = services.SingleOrDefault(
            d => d.ServiceType ==
                 typeof(DbContextOptions<DataContext>));

          services.Remove(descriptor);

          services.AddDbContext<DataContext>(options => options
            .UseInMemoryDatabase("test"));

          var sp = services.BuildServiceProvider();

          var scope = sp.CreateScope();
          var db = scope.ServiceProvider.GetRequiredService<DataContext>();

          db.Database.EnsureCreated();

          DbSeeding.SeedUsers(db);
          DbSeeding.SeedCategory(db);
        });
      });
  }

  public static HttpClient InitDatabaseAndCreateClient()
  {
    var appFactory = new WebApplicationFactory<Program>()
      .WithWebHostBuilder(builder =>
      {
        builder.ConfigureServices(services =>
        {
          var descriptor = services.SingleOrDefault(
            d => d.ServiceType ==
                 typeof(DbContextOptions<DataContext>));

          services.Remove(descriptor);

          services.AddDbContext<DataContext>(options => options
            .UseInMemoryDatabase("test"));

          var sp = services.BuildServiceProvider();

          var scope = sp.CreateScope();
          var db = scope.ServiceProvider.GetRequiredService<DataContext>();

          db.Database.EnsureCreated();

          DbSeeding.SeedUsers(db);
          DbSeeding.SeedCategory(db);
        });
      });

    return appFactory.CreateClient();
  }

  public static async Task TestPermissions(HttpClient testClient, Func<Task<HttpResponseMessage?>> function,
    List<Flags> shouldPass)
  {
    List<Flags> passingPerms = new List<Flags>();
    int runs = 0;

    foreach (Flags flag in Enum.GetValues(typeof(Flags)))
    {
      await Login(testClient, flag);

      var response = await function();

      await Logout(testClient);

      if (response.StatusCode != HttpStatusCode.Unauthorized
          && response.StatusCode != HttpStatusCode.Forbidden)
        passingPerms.Add(flag);

      runs++;
    }

    // administrator should be allowed to do everything
    if (!shouldPass.Contains(Flags.ADMINISTRATOR))
      shouldPass.Add(Flags.ADMINISTRATOR);

    // if even the user with no flags should be allowed
    // then the passingPerms list's length should be 
    // the amount of flags 
    if (shouldPass.Contains(Flags.NO_FLAGS))
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

  public static async Task Login(HttpClient testClient, Flags flag)
  {
    var user = DbSeeding.GetUser(flag);

    user.Should().NotBeNull();

    var loginDto = new LoginDto
    {
      Email = user.Email,
      Password = user.Password
    };

    var response = await testClient.PostAsync(Routes.Auth.Login, JsonContent.Create(loginDto));

    var json = await response.Content.ReadFromJsonAsync<LoginResponse>();

    if (!response.IsSuccessStatusCode)
    {
      var debug = await response.Content.ReadFromJsonAsync<object>();
      throw new Exception("Login failed");
    }

    var accessToken = json.AccessToken;
    accessToken.Length.Should().BeGreaterThan(10);

    testClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
  }

  public static async Task Logout(HttpClient testClient)
  {
    await testClient.PostAsync(Routes.Auth.Logout, null);
    testClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "");
  }

  public static string GetIdFromLocationUri(Uri locationHeader)
    => locationHeader.ToString().Split("/").Last();
}