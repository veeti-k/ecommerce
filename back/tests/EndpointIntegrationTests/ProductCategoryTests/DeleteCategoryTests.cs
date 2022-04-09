using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.Security;
using FluentAssertions;
using Microsoft.AspNetCore.SignalR;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductCategoryTests;

public class DeleteCategoryTests : ProductCategoryIntegrationTest
{
  [Fact]
  public async Task DeleteCategory_WithExistingCategory_DeletesCategory_Returns204()
  {
    var category = await AddCategory();

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteCategory_TEST_REQUEST(category.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var categories = await GetCategories();

    categories.AllCategories.Any(c => c.Id == category.Id).Should().BeFalse();
  }

  [Fact]
  public async Task DeleteCategory_WithoutExistingCategory_Returns404()
  {
    var categoryId = NonExistentIntId;

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteCategory_TEST_REQUEST(categoryId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductCategoryNotFoundException(categoryId));
  }

  [Fact]
  public async Task DeleteCategory_TestPerms()
  {
    await TestPermissions(() => DeleteCategory_TEST_REQUEST(NonExistentIntId),
      new List<Flags>() {Flags.MANAGE_CATEGORIES});
  }
}