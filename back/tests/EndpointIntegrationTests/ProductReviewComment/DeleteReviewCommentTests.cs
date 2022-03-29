using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductReviewComment;

public class DeleteReviewCommentTests : ProductReviewCommentIntegrationTest
{
  [Fact]
  public async Task
    DeleteReviewComment_WithExistingProduct_WithApprovedExistingReview_WithExistingComment_DeletesComment_Returns204()
  {
    var existingProduct = await AddProduct();
    var existingReview = await AddReview(existingProduct.Id);
    await ApproveReview(existingProduct.Id, existingReview.Id);
    var existingComment = await AddReviewComment(existingProduct.Id, existingReview.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(existingProduct.Id, existingReview.Id, existingComment.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var reviews = await GetApprovedProductReviews(existingProduct.Id);
    var theReview = reviews.FirstOrDefault(foundReview => foundReview.Id == existingReview.Id);

    theReview.Comments.Any(comment => comment.Id == existingComment.Id).Should().BeFalse();
  }

  [Fact]
  public async Task DeleteReviewComment_WithNonExistentProduct_ReturnsProductNotFound()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(NonExistentIntId, NonExistentGuidId, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task DeleteReviewComment_WithExistingProduct_WithNonExistingReview_ReturnsReviewNotFound()
  {
    var product = await AddProduct();

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(product.Id, NonExistentGuidId, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task DeleteReviewComment_WithExistingProduct_WithNotApprovedExistingReview_ReturnsReviewNotFound()
  {
    var product = await AddProduct();
    var review = await AddReview(product.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(product.Id, NonExistentGuidId, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task
    DeleteReviewComment_WithExistingProduct_WithApprovedExistingReview_WithNonExistentComment_ReturnsCommentNotFound()
  {
    var product = await AddProduct();
    var review = await AddReview(product.Id);
    await ApproveReview(product.Id, review.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(product.Id, review.Id, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewCommentNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task
    DeleteReviewComment_WithExistingProduct_WithApprovedExistingReview_WithNotApprovedExistingComment_DeletesComment_Returns204()
  {
    var existingProduct = await AddProduct();
    var existingReview = await AddReview(existingProduct.Id);
    await ApproveReview(existingProduct.Id, existingReview.Id);
    var existingComment = await AddReviewComment(existingProduct.Id, existingReview.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(existingProduct.Id, existingReview.Id, existingComment.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    // TODO: when there's an endpoint which returns all the comments
    // check through that if the comment was actually deleted
    var reviews = await GetApprovedProductReviews(existingProduct.Id);
    var theReview = reviews.FirstOrDefault(foundReview => foundReview.Id == existingReview.Id);

    theReview.Comments.Any(comment => comment.Id == existingComment.Id).Should().BeFalse();
  }

  [Fact]
  public async Task DeleteReviewComment_TestPerms()
  {
    await TestPermissions(
      () => DeleteReviewComment_TEST_REQUEST(NonExistentIntId, NonExistentGuidId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_REVIEWS}
    );
  }
}