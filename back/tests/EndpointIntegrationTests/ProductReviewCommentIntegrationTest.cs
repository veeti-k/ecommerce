using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Endpoints;
using api.RequestsAndResponses.ProductReviewComment;
using api.RequestsAndResponses.ProductReviewComment.Add;
using api.Security;
using FluentAssertions;

namespace tests.EndpointIntegrationTests;

public class ProductReviewCommentIntegrationTest : ProductReviewIntegrationTest
{
  // add review comment
  public static readonly CreateProductReviewCommentDto TestProductReviewCommentDto = new()
  {
    CommentersNickname = Guid.NewGuid().ToString(),
    Content = Guid.NewGuid().ToString(),
    Title = Guid.NewGuid().ToString()
  };

  public async Task<HttpResponseMessage?> AddReviewComment_TEST_REQUEST(int productId, Guid reviewId)
  {
    var path = Routes.Products.Product.Reviews.Review.CommentsRoot
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.ReviewId, reviewId.ToString());

    var response = await TestClient.PostAsync(path, JsonContent.Create(TestProductReviewCommentDto));

    return response;
  }

  public async Task<ProductReviewCommentResponse> AddReviewComment(int productId, Guid reviewId)
  {
    var response = await AddReviewComment_TEST_REQUEST(productId, reviewId);

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<ProductReviewCommentResponse>();

    return json;
  }

  // approve review comment
  public async Task<HttpResponseMessage?> ApproveReviewComment_TEST_REQUEST(int productId, Guid reviewId,
    Guid commentId)
  {
    var path = Routes.Products.Product.Reviews.Review.Comments.Comment
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.ReviewId, reviewId.ToString())
      .Replace(Routes.Products.CommentId, commentId.ToString());

    var response = await TestClient.PatchAsync(path, JsonContent.Create(""));

    return response;
  }

  public async Task<ProductReviewCommentResponse> ApproveReviewComment(int productId, Guid reviewId, Guid commentId)
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveReviewComment_TEST_REQUEST(productId, reviewId, commentId);

    await Logout();

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<ProductReviewCommentResponse>();

    return json;
  }

  // delete review comment
  public async Task<HttpResponseMessage?> DeleteReviewComment_TEST_REQUEST(int productId, Guid reviewId, Guid commentId)
  {
    var path = Routes.Products.Product.Reviews.Review.Comments.Comment
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.ReviewId, reviewId.ToString())
      .Replace(Routes.Products.CommentId, commentId.ToString());

    var response = await TestClient.DeleteAsync(path);

    return response;
  }

  public async Task DeleteReviewComment(int productId, Guid reviewId, Guid commentId)
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(productId, reviewId, commentId);

    await Logout();

    response.IsSuccessStatusCode.Should().BeTrue();
  }
}