using System.Collections.Generic;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.RequestsAndResponses.Product;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.Product;

public class AddProductTest : ProductIntegrationTest
{
  [Fact]
  public async Task AddProduct_ReturnsAddedProduct()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await AddProduct_TEST_REQUEST();

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var jsonResponse = await response.Content.ReadFromJsonAsync<BaseProductResponse>();

    jsonResponse.Should().BeEquivalentTo(TestProductDto);
  }

  [Fact]
  public async Task AddProduct_TestPerms()
  {
    await TestPermissions(AddProduct_TEST_REQUEST,
      new List<Flags>() {Flags.MANAGE_PRODUCTS});
  }
}