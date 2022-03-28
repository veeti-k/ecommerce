using System.Collections.Generic;
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
  public async Task RemoveReview_WithExistingProduct_RemovesProduct_ReturnsNoContent()
  {
    var product = await AddProduct();
    var review = await AddReview(product.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteReview_TEST_REQUEST(product.Id, review.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);
  }

  [Fact]
  public async Task RemoveReview_WithNonExistentProduct_ReturnsProductNotFound()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteReview_TEST_REQUEST(NonExistentIntId, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task RemoveReview_WithExistingProduct_WithNonExistentReview_ReturnsReviewNotFound()
  {
    var product = await AddProduct();

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteReview_TEST_REQUEST(product.Id, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductReviewNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task RemoveReview_TestPerms()
  {
    await TestPermissions(() => DeleteReview_TEST_REQUEST(NonExistentIntId, NonExistentGuidId),
      new List<Flags>() {Flags.MANAGE_REVIEWS});
  }
}