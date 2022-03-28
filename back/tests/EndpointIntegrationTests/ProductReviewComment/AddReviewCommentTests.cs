using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.ProductReviewComment;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductReviewComment;

public class AddReviewCommentTests : ProductReviewCommentIntegrationTest
{
  [Fact]
  public async Task AddReviewComment_WithExistingProduct_WithExistingReview_ReturnsOk_ReturnsAddedComment()
  {
    var product = await AddProduct();
    var review = await AddReview(product.Id);

    var response = await AddReviewComment_TEST_REQUEST(product.Id, review.Id);

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var json = await response.Content.ReadFromJsonAsync<ProductReviewCommentResponse>();

    json.Should().BeEquivalentTo(TestProductReviewCommentDto);
  }

  [Fact]
  public async Task AddReviewComment_AfterAdding_DoesNotExposeReview_UntilApproved()
  {
    var product = await AddProduct();
    var review = await AddReview(product.Id);
    await ApproveReview(product.Id, review.Id);
    var comment = await AddReviewComment(product.Id, review.Id);

    var reviews = await GetApprovedProductReviews(product.Id);
    var reviewTheCommentWasAddedOn1 = reviews.FirstOrDefault(foundReview => foundReview.Id == review.Id);

    reviewTheCommentWasAddedOn1.Comments.Any(foundComment => foundComment.Id == comment.Id).Should().BeFalse();

    await ApproveReviewComment(product.Id, review.Id, comment.Id);
    
    var reviews2 = await GetApprovedProductReviews(product.Id);
    var reviewTheCommentWasAddedOn2 = reviews2.FirstOrDefault(foundReview => foundReview.Id == review.Id);

    reviewTheCommentWasAddedOn2.Comments.Any(foundComment => foundComment.Id == comment.Id).Should().BeTrue();
  }

  [Fact]
  public async Task AddReviewComment_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var response = await AddReviewComment_TEST_REQUEST(NonExistentIntId, NonExistentGuidId);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task AddReviewComment_WithExistingProduct_WithNonExistentReview_ReturnsReviewNotFound()
  {
    var product = await AddProduct();

    var response = await AddReviewComment_TEST_REQUEST(product.Id, NonExistentGuidId);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(NonExistentGuidId));
  }
}