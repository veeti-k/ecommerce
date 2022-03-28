using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.Product;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.Product;

public class GetProductTests : ProductIntegrationTest
{
  [Fact]
  public async Task GetProduct_WithExistingProductId_ReturnsProduct()
  {
    var product = await AddProduct();

    var response = await GetProduct_TEST_REQUEST(product.Id);

    var json = await response.Content.ReadFromJsonAsync<ProductPageProductResponse>();

    response.StatusCode.Should().Be(HttpStatusCode.OK);
    json.Should().BeEquivalentTo(product, options => options
      .ExcludingMissingMembers());
  }

  [Fact]
  public async Task GetProduct_WithNonExistentProductId_ReturnsProductNotFound()
  {
    var response = await GetProduct_TEST_REQUEST(NonExistentIntId);
    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }
}