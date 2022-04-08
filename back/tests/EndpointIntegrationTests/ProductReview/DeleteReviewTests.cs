using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductReview;

public class DeleteReviewTests : ProductReviewIntegrationTest
{
  [Fact]
  public async Task DeleteReview_WithExistingProduct_WithApprovedExistingReview_DeletesReview_ReturnsNoContent()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var review = await AddReview(testClient, product.Id);
    await ApproveReview(testClient, product.Id, review.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteReview_TEST_REQUEST(testClient, product.Id, review.Id);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var reviews = await GetApprovedProductReviews(testClient, product.Id);
    reviews.Any(foundReview => foundReview.Id == review.Id).Should().BeFalse();
  }

  [Fact]
  public async Task DeleteReview_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteReview_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task DeleteReview_WithExistingProduct_WithNonExistentReview_ReturnsReviewNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteReview_TEST_REQUEST(testClient, product.Id, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task DeleteReview_WithExistingProduct_WithNotApprovedExistingReview_DeletesReview_ReturnsNoContent()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var review = await AddReview(testClient, product.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteReview_TEST_REQUEST(testClient, product.Id, review.Id);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var reviews = await GetApprovedProductReviews(testClient, product.Id);
    reviews.Any(foundReview => foundReview.Id == review.Id).Should().BeFalse();
  }

  [Fact]
  public async Task DeleteReview_TestPerms()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient,
      () => DeleteReview_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_REVIEWS});
  }
}