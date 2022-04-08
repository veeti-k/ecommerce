using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.ProductReview;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductReview;

public class ApproveReviewTests : ProductReviewIntegrationTest
{
  [Fact]
  public async Task ApproveReview_WithExistingProduct_WithExistingReview_ApprovesReview_ReturnsApprovedReview()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var review = await AddReview(testClient, product.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await ApproveReview_TEST_REQUEST(testClient, product.Id, review.Id);

    await TestThings.Logout(testClient);


    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<ProductReviewResponse>();

    json.Should().BeEquivalentTo(review, options => options.ExcludingMissingMembers());

    var reviews = await GetApprovedProductReviews(testClient, product.Id);
    reviews.Any(approvedReview => approvedReview.Id == review.Id).Should().BeTrue();
  }

  [Fact]
  public async Task ApproveReview_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await ApproveReview_TEST_REQUEST(testClient, NonExistentIntId, Guid.NewGuid());

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task ApproveReview_WithExistingProduct_WithNonExistentReview_ReturnsReviewNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await ApproveReview_TEST_REQUEST(testClient, product.Id, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task ApproveReview_TestPerms()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient,
      () => ApproveReview_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_REVIEWS});
  }
}