using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductCategoryTests;

public class AddCategoryTests : ProductCategoryIntegrationTest
{
  [Fact]
  public async Task AddCategory_AddsCategory_Returns201()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await AddCategory_TEST_REQUEST();

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    // check if category was added
    var addedId = int.Parse(GetIdFromLocationHeader(response.Headers.Location));
    var categories = await GetCategories();

    var addedCategory = categories.AllCategories.FirstOrDefault(c => c.Id == addedId);

    addedCategory.Should().BeEquivalentTo(TestAddCategoryDto);
  }

  [Fact]
  public async Task AddCategory_TestPerms()
  {
    await TestPermissions(() => AddCategory_TEST_REQUEST(),
      new List<Flags>() {Flags.MANAGE_CATEGORIES});
  }
}