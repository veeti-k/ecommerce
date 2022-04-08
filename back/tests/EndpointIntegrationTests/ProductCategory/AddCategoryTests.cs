using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using api;
using api.Data;
using api.Security;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using tests.UtilsForTesting;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductCategory;

public class AddCategoryTests : ProductCategoryIntegrationTest
{
  [Fact]
  public async Task AddCategory_AddsCategory_ReturnsAddedCategory()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await AddCategory_TEST_REQUEST(testClient);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    // check if category got added
    var categories = await GetCategories(testClient);

    var addedId = int.Parse(TestThings.GetIdFromLocationUri(response.Headers.Location));

    categories.AllCategories
      .Any(c => c.Name == TestAddCategoryDto.Name
                && c.Id == addedId)
      .Should().BeTrue();
  }

  [Fact]
  public async Task AddCategory_TestPerms()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient, () => AddCategory_TEST_REQUEST(testClient),
      new List<Flags>() {Flags.MANAGE_CATEGORIES});
  }
}