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

namespace tests.EndpointIntegrationTests.ProductReviewComment;

public class ApproveReviewCommentTests : ProductReviewCommentIntegrationTest
{
  [Fact]
  public async Task
    ApproveReviewComment_WithExistingProduct_WithApprovedExistingReview_WithExistingComment_Approves_ReturnsApprovedReviewComment()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var existingProduct = await AddProduct(testClient);
    var existingReview = await AddReview(testClient, existingProduct.Id);
    await ApproveReview(testClient, existingProduct.Id, existingReview.Id);
    var existingComment = await AddReviewComment(testClient, existingProduct.Id, existingReview.Id);

    await TestThings.Login(
      testClient, Flags.ADMINISTRATOR);

    var response =
      await ApproveReviewComment_TEST_REQUEST(testClient, existingProduct.Id, existingReview.Id, existingComment.Id);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<ProductReviewCommentResponse>();

    json.Should().BeEquivalentTo(existingComment, options => options.ExcludingMissingMembers());

    var reviews = await GetApprovedProductReviews(testClient, existingProduct.Id);
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
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.Login(
      testClient, Flags.ADMINISTRATOR);

    var response =
      await ApproveReviewComment_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task ApproveReviewComment_WithExistingProduct_WithNonExistentReview_ReturnsReviewNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    await TestThings.Login(
      testClient, Flags.ADMINISTRATOR);

    var response =
      await ApproveReviewComment_TEST_REQUEST(testClient, product.Id, NonExistentGuidId, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task
    ApproveReviewComment_WithExistingProduct_WithApprovedExistingReview_WithNonExistentComment_ReturnsCommentNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var review = await AddReview(testClient, product.Id);
    await ApproveReview(testClient, product.Id, review.Id);

    await TestThings.Login(
      testClient, Flags.ADMINISTRATOR);

    var response = await ApproveReviewComment_TEST_REQUEST(testClient, product.Id, review.Id, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewCommentNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task
    ApproveReviewComment_WithExistingProduct_WithNotApprovedExistingReview_ReturnsReviewNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var review = await AddReview(testClient, product.Id);

    await TestThings.Login(
      testClient, Flags.ADMINISTRATOR);

    var response = await ApproveReviewComment_TEST_REQUEST(testClient, product.Id, review.Id, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(review.Id));
  }

  [Fact]
  public async Task ApproveReviewComment_TestPerms()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient, () =>
        ApproveReviewComment_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_REVIEWS});
  }
}