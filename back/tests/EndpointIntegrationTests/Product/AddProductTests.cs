using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.Product;

public class AddProductTest : ProductIntegrationTest
{
  [Fact]
  public async Task AddProduct_AddsProduct_Returns201()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await AddProduct_TEST_REQUEST(testClient);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var addedId = int.Parse(TestThings.GetIdFromLocationUri(response.Headers.Location));
    var product = await GetProduct(testClient, addedId);

    product.Should().BeEquivalentTo(TestProductDto, options => options
      .Excluding(x => x.CategoryId)
      .Excluding(x => x.BulletPoints)
      .Excluding(x => x.ImageLinks));
  }

  [Fact]
  public async Task AddProduct_TestPerms()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient, () => AddProduct_TEST_REQUEST(testClient),
      new List<Flags> {Flags.MANAGE_PRODUCTS});
  }
}