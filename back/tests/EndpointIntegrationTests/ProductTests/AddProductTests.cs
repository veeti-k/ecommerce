using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductTests;

public class AddProductTest : ProductIntegrationTest
{
  [Fact]
  public async Task AddProduct_AddsProduct_Returns201()
  {
    var category = await AddCategory();

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await AddProduct_TEST_REQUEST(category.ProductCategoryId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var addedId = int.Parse(GetIdFromLocationHeader(response.Headers.Location));
    var addedProduct = await GetProduct(addedId);

    addedProduct.Should()
      .BeEquivalentTo(TestProductDto, options => options
        .Excluding(x => x.DeepestCategoryId)
        .Excluding(x => x.ImageLinks)
        .Excluding(x => x.BulletPoints)
      );

    addedProduct.DeepestCategoryId.Should().Be(category.ProductCategoryId);

    foreach (var (bulletPoint, i) in addedProduct.BulletPoints.Select((value, i) => (value, i)))
      bulletPoint.Text.Should().Be(TestProductDto.BulletPoints[i].Text);

    foreach (var (imageLink, i) in addedProduct.Images.Select((value, i) => (value, i)))
      imageLink.Link.Should().Be(TestProductDto.ImageLinks[i].Link);

  }

  [Fact]
  public async Task AddProduct_TestPerms()
  {
    var category = await AddCategory();

    await TestPermissions(() => AddProduct_TEST_REQUEST(category.ProductCategoryId),
      new List<Flags> {Flags.MANAGE_PRODUCTS});
  }
}