using System;
using System.Linq;
using System.Net.Http;
using api;
using api.Data;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using tests.UtilsForTesting;

namespace tests.EndpointIntegrationTests;

public class BaseIntegrationTest
{
  protected readonly HttpClient TestClient;
  protected readonly int NonExistentIntId = Int32.MaxValue;
  protected readonly Guid NonExistentGuidId = Guid.NewGuid();

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
            .UseInMemoryDatabase("test-db"));

          var sp = services.BuildServiceProvider();

          using var scope = sp.CreateScope();
          var scopedServices = scope.ServiceProvider;
          var db = scopedServices.GetRequiredService<DataContext>();

          db.Database.EnsureCreated();

          DbSeeding.CreateAdminUser(db);
          DbSeeding.CreateNonAdminUser(db);
        });
      });

    TestClient = appFactory.CreateClient();
  }
}