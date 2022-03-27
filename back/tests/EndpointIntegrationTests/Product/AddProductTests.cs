using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.RequestsAndResponses.Product;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.Product;

public class AddProductTest : ProductIntegrationTest
{
  [Fact]
  public async Task AddProduct_OnNonAdminUser_ReturnsUnauthorized()
  {
    await LoginToNonAdmin();

    var response = await AddProduct_TEST_REQUEST();

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
  }
  
  [Fact]
  public async Task AddProduct_OnAdminUser_ReturnsAddedProduct()
  {
    await LoginToAdmin();
    
    var response = await AddProduct_TEST_REQUEST();

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.Created);
    
    var jsonResponse = await response.Content.ReadFromJsonAsync<BaseProductResponse>();
    jsonResponse.Should().BeEquivalentTo(TestProductDto);
  }
}