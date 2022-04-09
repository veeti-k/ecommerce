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

namespace tests.EndpointIntegrationTests.ProductReviewTests;

public class ApproveReviewTests : ProductReviewIntegrationTest
{
  [Fact]
  public async Task ApproveReview_WithExistingProduct_WithExistingReview_ApprovesReview_ReturnsApprovedReview()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.Id);
    var review = await AddReview(product.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveReview_TEST_REQUEST(product.Id, review.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<ProductReviewResponse>();

    json.Should().BeEquivalentTo(review, options => options.ExcludingMissingMembers());

    var reviews = await GetApprovedProductReviews(product.Id);
    reviews.Any(approvedReview => approvedReview.Id == review.Id).Should().BeTrue();
  }

  [Fact]
  public async Task ApproveReview_WithNonExistentProduct_ReturnsProductNotFound()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveReview_TEST_REQUEST(NonExistentIntId, Guid.NewGuid());

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task ApproveReview_WithExistingProduct_WithNonExistentReview_ReturnsReviewNotFound()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveReview_TEST_REQUEST(product.Id, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task ApproveReview_TestPerms()
  {
    await TestPermissions(() => ApproveReview_TEST_REQUEST(NonExistentIntId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_REVIEWS});
  }
}