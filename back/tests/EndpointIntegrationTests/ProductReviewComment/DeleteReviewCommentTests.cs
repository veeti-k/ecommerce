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
    DeleteReviewComment_WithExistingProduct_WithApprovedExistingReview_WithApprovedExistingComment_DeletesComment_Returns204()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    var review = await AddReview(testClient, product.Id);
    await ApproveReview(testClient, product.Id, review.Id);

    var comment = await AddReviewComment(testClient, product.Id, review.Id);
    await ApproveReviewComment(testClient, product.Id, review.Id, comment.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(testClient, product.Id, review.Id, comment.Id);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var reviews = await GetApprovedProductReviews(testClient, product.Id);
    var theReview = reviews.FirstOrDefault(foundReview => foundReview.Id == review.Id);

    theReview.Comments.Any(comment => comment.Id == comment.Id).Should().BeFalse();
  }

  [Fact]
  public async Task
    DeleteReviewComment_WithExistingProduct_WithApprovedExistingReview_WithNotApprovedExistingComment_DeletesComment_Returns204()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    var review = await AddReview(testClient, product.Id);
    await ApproveReview(testClient, product.Id, review.Id);

    var comment = await AddReviewComment(testClient, product.Id, review.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(testClient, product.Id, review.Id, comment.Id);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var reviews = await GetApprovedProductReviews(testClient, product.Id);
    var theReview = reviews.FirstOrDefault(foundReview => foundReview.Id == review.Id);

    theReview.Comments.Any(comment => comment.Id == comment.Id).Should().BeFalse();
  }

  [Fact]
  public async Task DeleteReviewComment_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response =
      await DeleteReviewComment_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task DeleteReviewComment_WithExistingProduct_WithoutExistingReview_ReturnsReviewNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(testClient, product.Id, NonExistentGuidId, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task DeleteReviewComment_WithExistingProduct_WithNotApprovedExistingReview_ReturnsReviewNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var review = await AddReview(testClient, product.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(testClient, product.Id, review.Id, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(review.Id));
  }

  [Fact]
  public async Task
    DeleteReviewComment_WithExistingProduct_WithApprovedExistingReview_WithoutExistingComment_ReturnsCommentNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    var review = await AddReview(testClient, product.Id);
    await ApproveReview(testClient, product.Id, review.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteReviewComment_TEST_REQUEST(testClient, product.Id, review.Id, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewCommentNotFoundException(NonExistentGuidId));
  }


  [Fact]
  public async Task DeleteReviewComment_TestPerms()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient,
      () => DeleteReviewComment_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_REVIEWS}
    );
  }
}