using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.Product;
using api.Security;
using Castle.Components.DictionaryAdapter;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductTests;

public class GetProductTests : ProductIntegrationTest
{
  [Fact]
  public async Task GetProduct_WithExistingProduct_ReturnsProduct()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.Id);

    var response = await GetProduct_TEST_REQUEST(product.Id);

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<ProductPageProductResponse>();

    json.Should().BeEquivalentTo(product);
  }

  [Fact]
  public async Task GetProduct_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var response = await GetProduct_TEST_REQUEST(NonExistentIntId);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task GetProduct_TestPerms()
  {
    await TestPermissions(() => GetProduct_TEST_REQUEST(NonExistentIntId),
      new EditableList<Flags> {Flags.NO_FLAGS});
  }
}