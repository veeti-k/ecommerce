using System;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Endpoints;
using api.RequestsAndResponses.Product;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.Product;

public class AddProductTest : BaseIntegrationTest
{
  private readonly double randomDouble = new Random().NextDouble();
  private readonly float randomFloat = new Random().NextSingle();

  [Fact]
  public async Task AddProduct_ReturnsAddedProduct()
  {
    await LoginToAdmin();

    var request = new AddProductDto()
    {
      Name = Guid.NewGuid().ToString(),
      Description = Guid.NewGuid().ToString(),
      Price = randomDouble,
      DiscountAmount = randomDouble,
      DiscountedPrice = randomDouble,
      DiscountPercent = randomFloat,
      IsDiscounted = true,
    };

    var response = await TestClient.PostAsJsonAsync(Routes.ProductsRoot, request);

    response.StatusCode.Should().Be(HttpStatusCode.Created);
    (await response.Content.ReadFromJsonAsync<BaseProductResponse>()).Should().BeEquivalentTo(request);
  }
}