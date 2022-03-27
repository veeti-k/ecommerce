using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Endpoints;
using api.RequestsAndResponses.Product;
using FluentAssertions;

namespace tests.EndpointIntegrationTests;

public class ProductIntegrationTest : NeedsAuthIntegrationTest
{
  public static readonly AddProductDto TestProductDto = new()
  {
    Name = Guid.NewGuid().ToString(),
    Description = Guid.NewGuid().ToString(),
    Price = 123,
    DiscountAmount = 0,
    DiscountedPrice = 123,
    DiscountPercent = 0,
    IsDiscounted = false
  };

  // add product
  public async Task<HttpResponseMessage?> AddProduct_TEST_REQUEST()
  {
    var request = TestProductDto;

    return await TestClient.PostAsJsonAsync(Routes.ProductsRoot, request);
  }

  public async Task<BaseProductResponse> AddProduct()
  {
    await LoginToAdmin();
    var response = await AddProduct_TEST_REQUEST();
    var json = await response.Content.ReadFromJsonAsync<BaseProductResponse>();

    response.StatusCode.Should().Be(HttpStatusCode.Created);
    json.Id.Should().BePositive();

    await Logout();

    return json;
  }

  // get product
  public async Task<HttpResponseMessage?> GetProduct_TEST_REQUEST(int productId)
  {
    var path = Routes.Products.ProductRoot
      .Replace(Routes.Products.ProductId, productId.ToString());

    return await TestClient.GetAsync(path);
  }

  public async Task<ProductPageProductResponse> GetProduct(int productId)
  {
    var response = await GetProduct_TEST_REQUEST(productId);
    var json = await response.Content.ReadFromJsonAsync<ProductPageProductResponse>();

    return json;
  }
}