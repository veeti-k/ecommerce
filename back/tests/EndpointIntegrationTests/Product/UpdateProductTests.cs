using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.Product;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.Product;

public class UpdateProductTests : ProductIntegrationTest
{
  [Fact]
  public async Task UpdateProduct_WithExistingProduct_UpdatesProduct_ReturnsUpdatedProduct()
  {
    var product = await AddProduct();

    await LoginToAdmin();

    var response = await UpdateProduct_TEST_REQUEST(product.Id);

    await Logout();
    
    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<BaseProductResponse>();

    json.Should().BeEquivalentTo(TestUpdateProductDto, options => options.ExcludingMissingMembers());
  }

  [Fact]
  public async Task UpdateProduct_WithNonExistentProduct_ReturnsProductNotFound()
  {
    await LoginToAdmin();

    var response = await UpdateProduct_TEST_REQUEST(NonExistentIntId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    
    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }
}