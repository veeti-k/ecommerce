using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductReviewCommentTests;

public class DeleteReviewCommentTests : ProductReviewCommentIntegrationTest
{
  [Fact]
  public async Task
    DeleteReviewComment_WithExistingProduct_WithApprovedExistingReview_WithApprovedExistingComment_DeletesComment_Returns204()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);

    var review = await AddReview(product.Id);
    await ApproveReview(product.Id, review.Id);

    var comment = await AddReviewComment(product.Id, review.Id);
    await ApproveReviewComment(product.Id, review.Id, comment.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(product.Id, review.Id, comment.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var reviews = await GetApprovedProductReviews(product.Id);
    var theReview = reviews.FirstOrDefault(foundReview => foundReview.Id == review.Id);

    theReview.Comments.Any(comment => comment.Id == comment.Id).Should().BeFalse();
  }

  [Fact]
  public async Task
    DeleteReviewComment_WithExistingProduct_WithApprovedExistingReview_WithNotApprovedExistingComment_DeletesComment_Returns204()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);

    var review = await AddReview(product.Id);
    await ApproveReview(product.Id, review.Id);

    var comment = await AddReviewComment(product.Id, review.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(product.Id, review.Id, comment.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var reviews = await GetApprovedProductReviews(product.Id);
    var theReview = reviews.FirstOrDefault(foundReview => foundReview.Id == review.Id);

    theReview.Comments.Any(comment => comment.Id == comment.Id).Should().BeFalse();
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
  public async Task DeleteReviewComment_WithExistingProduct_WithoutExistingReview_ReturnsReviewNotFound()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);

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
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);
    var review = await AddReview(product.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(product.Id, review.Id, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(review.Id));
  }

  [Fact]
  public async Task
    DeleteReviewComment_WithExistingProduct_WithApprovedExistingReview_WithoutExistingComment_ReturnsCommentNotFound()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);

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
  public async Task DeleteReviewComment_TestPerms()
  {
    await TestPermissions(
      () => DeleteReviewComment_TEST_REQUEST(NonExistentIntId, NonExistentGuidId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_REVIEWS}
    );
  }
}