using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Endpoints;
using api.RequestsAndResponses.ProductReview;
using api.RequestsAndResponses.ProductReview.Add;
using api.Security;
using FluentAssertions;

namespace tests.EndpointIntegrationTests;

public class ProductReviewIntegrationTest : ProductIntegrationTest
{
  // add review
  public static readonly AddProductReviewDto TestProductReviewDto = new()
  {
    Content = Guid.NewGuid().ToString(),
    Title = Guid.NewGuid().ToString(),
    ReviewersNickname = Guid.NewGuid().ToString(),
    Stars = new Random().Next()
  };

  public async Task<HttpResponseMessage?> AddReview_TEST_REQUEST(HttpClient testClient, int productId)
  {
    var path = Routes.Products.Product.ReviewsRoot
      .Replace(Routes.Products.ProductId, productId.ToString());

    var response = await testClient.PostAsJsonAsync(path, TestProductReviewDto);

    return response;
  }

  public async Task<ProductReviewResponse> AddReview(HttpClient testClient, int productId)
  {
    var response = await AddReview_TEST_REQUEST(testClient, productId);

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<ProductReviewResponse>();

    return json;
  }

  // approve review
  public async Task<HttpResponseMessage?> ApproveReview_TEST_REQUEST(HttpClient testClient, int productId,
    Guid reviewId)
  {
    var path = Routes.Products.Product.Reviews.ReviewRoot
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.ReviewId, reviewId.ToString());

    var response = await testClient.PatchAsync(path, JsonContent.Create(""));

    return response;
  }

  public async Task<ProductReviewResponse> ApproveReview(HttpClient testClient, int productId, Guid reviewId)
  {
    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await ApproveReview_TEST_REQUEST(testClient, productId, reviewId);

    await TestThings.Logout(testClient);

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<ProductReviewResponse>();

    return json;
  }

  // get approved reviews
  public async Task<HttpResponseMessage?> GetApprovedProductReviews_TEST_REQUEST(HttpClient testClient, int productId)
  {
    var path = Routes.Products.Product.ReviewsRoot
      .Replace(Routes.Products.ProductId, productId.ToString());

    var response = await testClient.GetAsync(path);

    return response;
  }

  public async Task<IEnumerable<ProductReviewResponse>> GetApprovedProductReviews(HttpClient testClient, int productId)
  {
    var response = await GetApprovedProductReviews_TEST_REQUEST(testClient, productId);

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<IEnumerable<ProductReviewResponse>>();

    return json;
  }

  // delete review
  public async Task<HttpResponseMessage?> DeleteReview_TEST_REQUEST(HttpClient testClient, int productId, Guid reviewId)
  {
    var path = Routes.Products.Product.Reviews.ReviewRoot
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.ReviewId, reviewId.ToString());

    var response = await testClient.DeleteAsync(path);

    return response;
  }

  public async Task DeleteReview(HttpClient testClient, int productId, Guid reviewId)
  {
    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteReview_TEST_REQUEST(testClient, productId, reviewId);

    await TestThings.Logout(testClient);

    response.IsSuccessStatusCode.Should().BeTrue();
  }
}