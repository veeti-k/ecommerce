using System.Collections.Generic;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.Product;

public class UpdateProductTests : ProductIntegrationTest
{
  [Fact]
  public async Task UpdateProduct_WithExistingProduct_UpdatesProduct_Returns200()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await UpdateProduct_TEST_REQUEST(testClient, product.Id);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var updated = await GetProduct(testClient, product.Id);
    updated.Should().BeEquivalentTo(TestUpdateProductDto, options => options.Excluding(x => x.CategoryId));
  }

  [Fact]
  public async Task UpdateProduct_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await UpdateProduct_TEST_REQUEST(testClient, NonExistentIntId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task UpdateProduct_TestPerms()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient, () => UpdateProduct_TEST_REQUEST(testClient, NonExistentIntId),
      new List<Flags> {Flags.MANAGE_PRODUCTS});
  }
}