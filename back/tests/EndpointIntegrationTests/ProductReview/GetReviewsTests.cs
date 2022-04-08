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

public class GetReviewsTests : ProductReviewIntegrationTest
{
  [Fact]
  public async Task GetReviews_WithExistingProduct_WithExistingReviews_ReturnsOnlyApprovedReviews()
  {
    var product = await AddProduct();
    var review1 = await AddReview(product.Id);
    var review2 = await AddReview(product.Id);

    await ApproveReview(product.Id, review1.Id);

    var reviews = await GetApprovedProductReviews(product.Id);

    reviews.Any(rev => rev.Id == review2.Id).Should().BeFalse();
    reviews.Any(rev => rev.Id == review1.Id).Should().BeTrue();
  }

  [Fact]
  public async Task GetReviews_WithNonExistentProductId_ReturnsProductNotFound()
  {
    var response = await GetApprovedProductReviews_TEST_REQUEST(NonExistentIntId);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task GetReviews_WithExistingProductId_NoReviews_ReturnsEmptyList()
  {
    var product = await AddProduct();

    var response = await GetApprovedProductReviews_TEST_REQUEST(product.Id);

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<IEnumerable<ProductReviewResponse>>();

    json.Should().BeEmpty();
  }

  [Fact]
  public async Task GetReviews_TestPerms()
  {
    await TestPermissions(() => GetApprovedProductReviews_TEST_REQUEST(NonExistentIntId),
      new List<Flags> {Flags.NO_FLAGS});
  }
}