using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.Product;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductTests;

public class UpdateProductTests : ProductIntegrationTest
{
  [Fact]
  public async Task UpdateProduct_WithExistingProduct_UpdatesProduct_ReturnsUpdatedProduct()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.Id);

    var newCategory = await AddCategory();

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await UpdateProduct_TEST_REQUEST(product.Id, newCategory.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var updated = await GetProduct(product.Id);
    updated.Should()
      .BeEquivalentTo(TestProductDto, options => options
        .Excluding(x => x.DeepestCategoryId)
        .Excluding(x => x.BulletPoints)
        .Excluding(x => x.ImageLinks));

    updated.DeepestCategoryId.Should().Be(newCategory.Id);

    foreach (var (bulletPoint, index) in updated.BulletPoints.Select((value, i) => (value, i)))
      bulletPoint.Text.Should().Be(TestProductDto.BulletPoints[index]);

    foreach (var (imageLink, index) in updated.Images.Select((value, i) => (value, i)))
      imageLink.Link.Should().Be(TestProductDto.ImageLinks[index]);
  }

  [Fact]
  public async Task UpdateProduct_WithNonExistentProduct_ReturnsProductNotFound()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await UpdateProduct_TEST_REQUEST(NonExistentIntId, NonExistentIntId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task UpdateProduct_TestPerms()
  {
    await TestPermissions(() => UpdateProduct_TEST_REQUEST(NonExistentIntId, NonExistentIntId),
      new List<Flags> {Flags.MANAGE_PRODUCTS});
  }
}