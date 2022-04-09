using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Endpoints;
using api.Models.Product;
using api.RequestsAndResponses.Category;
using api.RequestsAndResponses.Product;
using api.RequestsAndResponses.Product.Add;
using api.Security;
using FluentAssertions;

namespace tests.EndpointIntegrationTests;

public class ProductCategoryIntegrationTest : NeedsAuthIntegrationTest
{
  

  // get categories
  public async Task<HttpResponseMessage?> GetCategories_TEST_REQUEST()
    => await TestClient.GetAsync(Routes.CategoriesRoot);

  public async Task<ProductCategoryResponse> GetCategories()
  {
    var response = await GetCategories_TEST_REQUEST();

    response.IsSuccessStatusCode.Should().BeTrue();

    return await response.Content.ReadFromJsonAsync<ProductCategoryResponse>();
  }

  // add category
  public static readonly AddCategoryDto TestAddCategoryDto = new()
  {
    Name = Guid.NewGuid().ToString(),
    ParentId = null
  };

  public async Task<HttpResponseMessage?> AddCategory_TEST_REQUEST()
  {
    var request = TestAddCategoryDto;

    return await TestClient.PostAsJsonAsync(Routes.CategoriesRoot, request);
  }

  public async Task<ProductCategory> AddCategory()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await AddCategory_TEST_REQUEST();

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var addedId = int.Parse(GetIdFromLocationHeader(response.Headers.Location));
    var categories = await GetCategories();

    return categories.AllCategories.FirstOrDefault(c => c.Id == addedId);
  }

  // add child category
  public async Task<HttpResponseMessage?> AddChildCategory_TEST_REQUEST(int parentId)
  {
    var request = new AddCategoryDto()
    {
      Name = Guid.NewGuid().ToString(),
      ParentId = parentId
    };

    return await TestClient.PostAsJsonAsync(Routes.CategoriesRoot, request);
  }

  public async Task<ProductCategory> AddChildCategory(int parentId)
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await AddChildCategory_TEST_REQUEST(parentId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var addedId = int.Parse(GetIdFromLocationHeader(response.Headers.Location));
    var categories = await GetCategories();

    return categories.AllCategories.FirstOrDefault(c => c.Id == addedId);
  }
}