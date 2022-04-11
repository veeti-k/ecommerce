using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.Category;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductCategoryTests;

public class UpdateCategoryTests : ProductCategoryIntegrationTest
{
  [Fact]
  public async Task UpdateCategory_UpdatesCategory_Returns200()
  {
    var category = await AddCategory();
    var newParent = await AddCategory();

    var dto = new UpdateCategoryDto()
    {
      Name = Guid.NewGuid().ToString(),
      ParentId = newParent.ProductCategoryId
    };

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await UpdateCategory_TEST_REQUEST(category.ProductCategoryId, dto);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var categories = await GetCategories();

    var updatedCategory = categories.AllCategories.FirstOrDefault(c => c.ProductCategoryId == category.ProductCategoryId);

    updatedCategory.Should().BeEquivalentTo(dto);
  }

  [Fact]
  public async Task UpdateCategory_WithSameParentIdAsTheCategory_DoesNotUpdateCategory_Returns400()
  {
    var category = await AddCategory();

    var dto = new UpdateCategoryDto()
    {
      Name = Guid.NewGuid().ToString(),
      ParentId = category.ProductCategoryId
    };

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await UpdateCategory_TEST_REQUEST(category.ProductCategoryId, dto);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();
    json.Message.Should().Be("Parent category cannot be the same as the category itself");

    var categories = await GetCategories();
    var categoryEq = categories.AllCategories.FirstOrDefault(c => c.ProductCategoryId == category.ProductCategoryId);

    categoryEq.Should().BeEquivalentTo(category);
  }

  [Fact]
  public async Task UpdateCategory_WithoutExistingParentCategory_DoesNotUpdateCategory_Returns404()
  {
    var category = await AddCategory();
    var newParentId = NonExistentIntId;

    var dto = new UpdateCategoryDto()
    {
      Name = Guid.NewGuid().ToString(),
      ParentId = newParentId
    };

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await UpdateCategory_TEST_REQUEST(category.ProductCategoryId, dto);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();
    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductCategoryNotFoundException(newParentId));

    var categories = await GetCategories();
    var categoryEq = categories.AllCategories.FirstOrDefault(c => c.ProductCategoryId == category.ProductCategoryId);

    categoryEq.Should().BeEquivalentTo(category);
  }

  [Fact]
  public async Task UpdateCategory_TestPerms()
  {
    await TestPermissions(() => UpdateCategory_TEST_REQUEST(NonExistentIntId, new UpdateCategoryDto() { }),
      new List<Flags>() {Flags.MANAGE_CATEGORIES});
  }
}