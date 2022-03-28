using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.Product;

public class DeleteProductTests : ProductIntegrationTest
{
  [Fact]
  public async Task DeleteProduct_WithExistingProduct_DeletesProduct_ReturnsNoContent()
  {
    var product = await AddProduct();

    await LoginToAdmin();

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
    await LoginToAdmin();

    var response = await DeleteProduct_TEST_REQUEST(NonExistentIntId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }
}