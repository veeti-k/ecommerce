using System;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.ProductReview;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductReview;

public class ApproveReviewTests : ProductReviewIntegrationTest
{
  [Fact]
  public async Task ApproveReview_WithExistingReview_ApprovesReview_ReturnsApprovedReview()
  {
    var product = await AddProduct();
    var review = await AddReview(product.Id);

    await LoginToAdmin();

    var response = await ApproveReview_TEST_REQUEST(product.Id, review.Id);
    
    await Logout();
    
    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<ProductReviewResponse>();

    json.Should().BeEquivalentTo(review, options => options.ExcludingMissingMembers());

    var reviews = await GetApprovedProductReviews(product.Id);
    reviews.Any(approvedReview => approvedReview.Id == review.Id).Should().BeTrue();
  }

  [Fact]
  public async Task ApproveReview_WithNonExistentProductId_ReturnsProductNotFound()
  {
    await LoginToAdmin();

    var response = await ApproveReview_TEST_REQUEST(NonExistentIntId, Guid.NewGuid());
    
    await Logout();
    
    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task ApproveReview_WithExistingProduct_WithNonExistentReviewId_ReturnsReviewNotFound()
  {
    var product = await AddProduct();

    await LoginToAdmin();

    var response = await ApproveReview_TEST_REQUEST(product.Id, NonExistentGuidId);
    
    await Logout();
    
    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(NonExistentGuidId));
  }
}