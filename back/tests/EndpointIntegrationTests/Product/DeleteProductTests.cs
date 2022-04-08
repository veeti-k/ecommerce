using System.Collections.Generic;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.Product;

public class DeleteProductTests : ProductIntegrationTest
{
  [Fact]
  public async Task DeleteProduct_WithExistingProduct_DeletesProduct_Returns204()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteProduct_TEST_REQUEST(testClient, product.Id);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var checkRequest = await GetProduct_TEST_REQUEST(testClient, product.Id);
    checkRequest.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await checkRequest.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(product.Id));
  }

  [Fact]
  public async Task DeleteProduct_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteProduct_TEST_REQUEST(testClient, NonExistentIntId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task DeleteProduct_TestPerms()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient, () => DeleteProduct_TEST_REQUEST(testClient, NonExistentIntId),
      new List<Flags> {Flags.MANAGE_PRODUCTS});
  }
}