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
  public async Task DeleteProduct_WithExistingProduct_DeletesProduct_ReturnsNoContent()
  {
    var product = await AddProduct();

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteProduct_TEST_REQUEST(product.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var checkRequest = await GetProduct_TEST_REQUEST(product.Id);
    checkRequest.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await checkRequest.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(product.Id));
  }

  [Fact]
  public async Task DeleteProduct_WithNonExistentProduct_ReturnsProductNotFound()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteProduct_TEST_REQUEST(NonExistentIntId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task DeleteProduct_TestPerms()
  {
    await TestPermissions(() => DeleteProduct_TEST_REQUEST(NonExistentIntId),
      new List<Flags> {Flags.MANAGE_PRODUCTS});
  }
}