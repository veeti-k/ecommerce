using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.ProductReviewComment;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductReviewCommentTests;

public class ApproveReviewCommentTests : ProductReviewCommentIntegrationTest
{
  [Fact]
  public async Task
    ApproveReviewComment_WithExistingProduct_WithApprovedExistingReview_WithExistingComment_Approves_ReturnsApprovedReviewComment()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);
    var existingReview = await AddReview(product.Id);
    await ApproveReview(product.Id, existingReview.Id);
    var existingComment = await AddReviewComment(product.Id, existingReview.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveReviewComment_TEST_REQUEST(product.Id, existingReview.Id, existingComment.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<ProductReviewCommentResponse>();

    json.Should().BeEquivalentTo(existingComment, options => options.ExcludingMissingMembers());

    var reviews = await GetApprovedProductReviews(product.Id);
    var theReview = reviews.FirstOrDefault(review => review.Id == existingReview.Id);
    theReview.Should().NotBeNull();

    theReview.Comments.FirstOrDefault(comment => comment.Id == existingComment.Id)
      .Should().NotBeNull()
      .And
      .BeEquivalentTo(existingComment);
  }

  [Fact]
  public async Task ApproveReviewComment_WithNonExistentProduct_ReturnsProductNotFound()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveReviewComment_TEST_REQUEST(NonExistentIntId, NonExistentGuidId, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task ApproveReviewComment_WithExistingProduct_WithNonExistentReview_ReturnsReviewNotFound()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveReviewComment_TEST_REQUEST(product.Id, NonExistentGuidId, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task
    ApproveReviewComment_WithExistingProduct_WithApprovedExistingReview_WithNonExistentComment_ReturnsCommentNotFound()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);
    var review = await AddReview(product.Id);
    await ApproveReview(product.Id, review.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveReviewComment_TEST_REQUEST(product.Id, review.Id, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewCommentNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task
    ApproveReviewComment_WithExistingProduct_WithNotApprovedExistingReview_ReturnsReviewNotFound()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);
    var review = await AddReview(product.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveReviewComment_TEST_REQUEST(product.Id, review.Id, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(review.Id));
  }

  [Fact]
  public async Task ApproveReviewComment_TestPerms()
  {
    await TestPermissions(() =>
        ApproveReviewComment_TEST_REQUEST(NonExistentIntId, NonExistentGuidId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_REVIEWS});
  }
}