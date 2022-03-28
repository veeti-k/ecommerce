using System;
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

namespace tests.EndpointIntegrationTests;

public class ProductIntegrationTest : NeedsAuthIntegrationTest
{
  // add product
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
  public async Task<HttpResponseMessage?> AddProduct_TEST_REQUEST()
  {
    var request = TestProductDto;

    return await TestClient.PostAsJsonAsync(Routes.ProductsRoot, request);
  }

  public async Task<BaseProductResponse> AddProduct()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await AddProduct_TEST_REQUEST();

    await Logout();

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<BaseProductResponse>();

    response.StatusCode.Should().Be(HttpStatusCode.Created);
    json.Id.Should().BePositive();

    return json;
  }

  // get product
  public async Task<HttpResponseMessage?> GetProduct_TEST_REQUEST(int productId)
  {
    var path = Routes.Products.ProductRoot
      .Replace(Routes.Products.ProductId, productId.ToString());

    var response = await TestClient.GetAsync(path);

    return response;
  }

  public async Task<ProductPageProductResponse> GetProduct(int productId)
  {
    var response = await GetProduct_TEST_REQUEST(productId);

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
    IsDiscounted = true
  };
  public async Task<HttpResponseMessage?> UpdateProduct_TEST_REQUEST(int productId)
  {
    var request = TestUpdateProductDto;
    
    var path = Routes.Products.ProductRoot
      .Replace(Routes.Products.ProductId, productId.ToString());

    var response = await TestClient.PatchAsync(path, JsonContent.Create(request));

    return response;
  }

  public async Task<BaseProductResponse> UpdateProduct(int productId)
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await UpdateProduct_TEST_REQUEST(productId);
    
    response.IsSuccessStatusCode.Should().BeTrue();

    await Logout();

    var json = await response.Content.ReadFromJsonAsync<BaseProductResponse>();

    return json;
  }
  
  // delete product
  public async Task<HttpResponseMessage?> DeleteProduct_TEST_REQUEST(int productId)
  {
    var path = Routes.Products.ProductRoot
      .Replace(Routes.Products.ProductId, productId.ToString());
    
    var response = await TestClient.DeleteAsync(path);

    return response;
  }

  public async Task DeleteProduct(int productId)
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteProduct_TEST_REQUEST(productId);
    
    response.IsSuccessStatusCode.Should().BeTrue();

    await Logout();
  }
}