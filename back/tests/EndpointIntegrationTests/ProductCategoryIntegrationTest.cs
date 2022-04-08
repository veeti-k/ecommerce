using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Endpoints;
using api.RequestsAndResponses.Category;
using api.Security;
using FluentAssertions;

namespace tests.EndpointIntegrationTests;

public class ProductCategoryIntegrationTest
{
  // add category
  public static readonly AddCategoryDto TestAddCategoryDto = new()
  {
    Name = Guid.NewGuid().ToString(),
    ParentId = null
  };

  public async Task<HttpResponseMessage?> AddCategory_TEST_REQUEST(HttpClient testClient)
  {
    var request = TestAddCategoryDto;

    var response = await testClient.PostAsJsonAsync(Routes.CategoriesRoot, request);

    return response;
  }

  public async Task<api.Models.Product.ProductCategory> AddCategory(HttpClient testClient)
  {
    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await AddCategory_TEST_REQUEST(testClient);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var addedId = int.Parse(TestThings.GetIdFromLocationUri(response.Headers.Location));
    var categories = await GetCategories(testClient);

    return categories.AllCategories.FirstOrDefault(c => c.Id == addedId);
  }

  // add child category
  public async Task<api.Models.Product.ProductCategory> AddChildCategory(HttpClient testClient, int parentCategoryId)
  {
    var request = new AddCategoryDto()
    {
      Name = Guid.NewGuid().ToString(),
      ParentId = parentCategoryId
    };

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await testClient.PostAsJsonAsync(Routes.CategoriesRoot, request);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var addedId = int.Parse(TestThings.GetIdFromLocationUri(response.Headers.Location));
    var categories = await GetCategories(testClient);

    return categories.AllCategories.FirstOrDefault(c => c.Id == addedId);
  }

  // get categories
  public async Task<HttpResponseMessage?> GetCategories_TEST_REQUEST(HttpClient testClient)
  {
    var response = await testClient.GetAsync(Routes.CategoriesRoot);

    return response;
  }

  public async Task<ProductCategoryResponse> GetCategories(HttpClient testClient)
  {
    var response = await GetCategories_TEST_REQUEST(testClient);

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<ProductCategoryResponse>();

    response.IsSuccessStatusCode.Should().BeTrue();

    return json;
  }
}