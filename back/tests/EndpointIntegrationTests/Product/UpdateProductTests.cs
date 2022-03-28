using System.Collections.Generic;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.Product;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.Product;

public class UpdateProductTests : ProductIntegrationTest
{
  [Fact]
  public async Task UpdateProduct_WithExistingProduct_UpdatesProduct_ReturnsUpdatedProduct()
  {
    var product = await AddProduct();

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await UpdateProduct_TEST_REQUEST(product.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<BaseProductResponse>();

    json.Should().BeEquivalentTo(TestUpdateProductDto, options => options.ExcludingMissingMembers());

    var updated = await GetProduct(product.Id);
    updated.Should().BeEquivalentTo(TestUpdateProductDto);
  }

  [Fact]
  public async Task UpdateProduct_WithNonExistentProduct_ReturnsProductNotFound()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await UpdateProduct_TEST_REQUEST(NonExistentIntId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task UpdateProduct_TestPerms()
  {
    await TestPermissions(() => UpdateProduct_TEST_REQUEST(NonExistentIntId),
      new List<Flags>() {Flags.MANAGE_PRODUCTS});
  }
}