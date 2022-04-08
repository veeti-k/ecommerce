using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Endpoints;
using api.RequestsAndResponses.Product;
using api.RequestsAndResponses.Product.Add;
using api.RequestsAndResponses.Product.Update;
using api.Security;
using FluentAssertions;
using tests.UtilsForTesting;

namespace tests.EndpointIntegrationTests;

public class ProductIntegrationTest
{
  protected readonly int NonExistentIntId = Int32.MaxValue;
  protected readonly Guid NonExistentGuidId = Guid.NewGuid();

  // add product
  public static readonly AddProductDto TestProductDto = new()
  {
    Name = Guid.NewGuid().ToString(),
    Description = Guid.NewGuid().ToString(),
    Price = 123,
    DiscountAmount = 0,
    DiscountedPrice = 123,
    DiscountPercent = 0,
    IsDiscounted = false,
    BulletPoints = new[] {Guid.NewGuid().ToString(), Guid.NewGuid().ToString()},
    ImageLinks = new[] {Guid.NewGuid().ToString(), Guid.NewGuid().ToString()},
    CategoryId = DbSeeding.BaseCategory.Id
  };

  public async Task<HttpResponseMessage?> AddProduct_TEST_REQUEST(HttpClient testClient)
  {
    var request = TestProductDto;

    return await testClient.PostAsJsonAsync(Routes.ProductsRoot, request);
  }

  public async Task<ProductPageProductResponse> AddProduct(HttpClient testClient)
  {
    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await AddProduct_TEST_REQUEST(testClient);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var location = response.Headers.Location.ToString();

    var productId = int.Parse(location.Split("/").Last());

    var addedProduct = await GetProduct(testClient, productId);

    return addedProduct;
  }

  // get product
  public async Task<HttpResponseMessage?> GetProduct_TEST_REQUEST(HttpClient testClient, int productId)
  {
    var path = Routes.Products.ProductRoot
      .Replace(Routes.Products.ProductId, productId.ToString());

    var response = await testClient.GetAsync(path);

    return response;
  }

  public async Task<ProductPageProductResponse> GetProduct(HttpClient testClient, int productId)
  {
    var response = await GetProduct_TEST_REQUEST(testClient, productId);

    var json = await response.Content.ReadFromJsonAsync<ProductPageProductResponse>();

    return json;
  }

  // update product
  public static readonly UpdateProductDto TestUpdateProductDto = new()
  {
    Name = Guid.NewGuid().ToString(),
    Description = Guid.NewGuid().ToString(),
    Price = new Random().NextDouble(),
    DiscountAmount = new Random().NextDouble(),
    DiscountedPrice = new Random().NextDouble(),
    DiscountPercent = new Random().Next(),
    IsDiscounted = true,
    CategoryId = DbSeeding.BaseCategory.Id
  };

  public async Task<HttpResponseMessage?> UpdateProduct_TEST_REQUEST(HttpClient testClient, int productId)
  {
    var request = TestUpdateProductDto;

    var path = Routes.Products.ProductRoot
      .Replace(Routes.Products.ProductId, productId.ToString());

    var response = await testClient.PatchAsync(path, JsonContent.Create(request));

    return response;
  }

  public async Task<BaseProductResponse> UpdateProduct(HttpClient testClient, int productId)
  {
    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await UpdateProduct_TEST_REQUEST(testClient, productId);

    response.IsSuccessStatusCode.Should().BeTrue();

    await TestThings.Logout(testClient);

    var json = await response.Content.ReadFromJsonAsync<BaseProductResponse>();

    return json;
  }

  // delete product
  public async Task<HttpResponseMessage?> DeleteProduct_TEST_REQUEST(HttpClient testClient, int productId)
  {
    var path = Routes.Products.ProductRoot
      .Replace(Routes.Products.ProductId, productId.ToString());

    var response = await testClient.DeleteAsync(path);

    return response;
  }

  public async Task DeleteProduct(HttpClient testClient, int productId)
  {
    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteProduct_TEST_REQUEST(testClient, productId);

    response.IsSuccessStatusCode.Should().BeTrue();

    await TestThings.Logout(testClient);
  }
}