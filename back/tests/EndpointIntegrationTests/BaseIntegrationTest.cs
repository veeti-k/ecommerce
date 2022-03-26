using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Data;
using api.Endpoints;
using api.RequestsAndResponses.Auth.Login;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using tests.ControllerTests.Utils;

namespace tests.EndpointIntegrationTests;

public class BaseIntegrationTest
{
  protected readonly HttpClient TestClient;

  protected BaseIntegrationTest()
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
            .UseInMemoryDatabase("InMemoryDbForTesting"));

          var sp = services.BuildServiceProvider();

          using var scope = sp.CreateScope();
          var scopedServices = scope.ServiceProvider;
          var db = scopedServices.GetRequiredService<DataContext>();

          db.Database.EnsureCreated();

          DbSeeding.CreateAdminUser(db);
        });
      });
    
    TestClient = appFactory.CreateClient();
  }

  protected async Task LoginToAdmin()
  {
    TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", await GetJwtAsync());
  }

  private async Task<string> GetJwtAsync()
  {
    var response = await TestClient.PostAsJsonAsync(Routes.Auth.Login, new LoginDto()
    {
      Email = DbSeeding.AdminEmail,
      Password = DbSeeding.AdminPassword
    });

    var json = await response.Content.ReadFromJsonAsync<LoginResponse>();
    if (json is null) throw new Exception("Authentication failed, access token was not returned from login");
    
    return json.AccessToken;
  }
}