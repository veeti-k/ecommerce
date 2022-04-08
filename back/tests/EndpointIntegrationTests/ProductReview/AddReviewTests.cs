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

public class AddReviewTests : ProductReviewIntegrationTest
{
  [Fact]
  public async Task AddReview_WithExistingProduct_AddsReview_ReturnsAddedReview()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    var response = await AddReview_TEST_REQUEST(testClient, product.Id);

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var json = await response.Content.ReadFromJsonAsync<ProductReviewResponse>();

    json.Should().BeEquivalentTo(TestProductReviewDto, options => options.ExcludingMissingMembers());
  }

  [Fact]
  public async Task AddReview_AfterAdding_DoesNotExposeReview_UntilApproved()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var review = await AddReview(testClient, product.Id);

    var reviews1 = await GetApprovedProductReviews(testClient, product.Id);
    reviews1.Any(foundReview => foundReview.Id == review.Id).Should().BeFalse();

    await ApproveReview(testClient, product.Id, review.Id);

    var reviews2 = await GetApprovedProductReviews(testClient, product.Id);
    reviews2.Any(foundReview => foundReview.Id == review.Id).Should().BeTrue();
  }

  [Fact]
  public async Task AddReview_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var response = await AddReview_TEST_REQUEST(testClient, NonExistentIntId);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task AddReview_TestPerms()
  {
     var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient, () => AddReview_TEST_REQUEST(testClient, NonExistentIntId),
      new List<Flags> {Flags.NO_FLAGS});
  }
}