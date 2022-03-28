using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.ProductReview;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductReview;

public class AddReviewTests : ProductReviewIntegrationTest
{
  [Fact]
  public async Task AddReview_WithExistingProduct_ReturnsAddedReview()
  {
    var product = await AddProduct();

    var response = await AddReview_TEST_REQUEST(product.Id);
    var json = await response.Content.ReadFromJsonAsync<ProductReviewResponse>();

    response.StatusCode.Should().Be(HttpStatusCode.Created);
    json.Should().BeEquivalentTo(TestProductReviewDto, options => options.ExcludingMissingMembers());
  }

  [Fact]
  public async Task AddReview_WithNonExistentProductId_ReturnsProductNotFound()
  {
    var response = await AddReview_TEST_REQUEST(NonExistentIntId);
    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }
}