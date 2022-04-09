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

public class ProductIntegrationTest : ProductCategoryIntegrationTest
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
    IsDiscounted = false,
    BulletPoints = new[] {Guid.NewGuid().ToString(), Guid.NewGuid().ToString()},
    ImageLinks = new[] {Guid.NewGuid().ToString(), Guid.NewGuid().ToString()},
  };

  public async Task<HttpResponseMessage?> AddProduct_TEST_REQUEST(int deepestCategoryId)
  {
    var request = new AddProductDto()
    {
      Name = TestProductDto.Name,
      Description = TestProductDto.Description,
      Price = TestProductDto.Price,
      DiscountAmount = TestProductDto.DiscountAmount,
      DiscountedPrice = TestProductDto.DiscountedPrice,
      DiscountPercent = TestProductDto.DiscountPercent,
      IsDiscounted = TestProductDto.IsDiscounted,
      BulletPoints = TestProductDto.BulletPoints,
      ImageLinks = TestProductDto.ImageLinks,
      DeepestCategoryId = deepestCategoryId,
    };

    return await TestClient.PostAsJsonAsync(Routes.ProductsRoot, request);
  }

  public async Task<ProductPageProductResponse> AddProduct(int deepestCategoryId)
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await AddProduct_TEST_REQUEST(deepestCategoryId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var addedId = int.Parse(GetIdFromLocationHeader(response.Headers.Location));

    var addedProduct = await GetProduct(addedId);

    return addedProduct;
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

  public async Task<HttpResponseMessage?> UpdateProduct_TEST_REQUEST(int productId, int newCategoryId)
  {
    var request = new UpdateProductDto()
    {
      Name = TestProductDto.Name,
      Description = TestProductDto.Description,
      Price = TestProductDto.Price,
      DiscountAmount = TestProductDto.DiscountAmount,
      DiscountedPrice = TestProductDto.DiscountedPrice,
      DiscountPercent = TestProductDto.DiscountPercent,
      IsDiscounted = TestProductDto.IsDiscounted,
      DeepestCategoryId = newCategoryId,
    };

    var path = Routes.Products.ProductRoot
      .Replace(Routes.Products.ProductId, productId.ToString());

    return await TestClient.PatchAsync(path, JsonContent.Create(request));
  }

  public async Task<ProductPageProductResponse> UpdateProduct(int productId, int newCategoryId)
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await UpdateProduct_TEST_REQUEST(productId, newCategoryId);

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    await Logout();

    var updatedProduct = await GetProduct(productId);

    return updatedProduct;
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