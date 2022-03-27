using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductReview;

public class GetReviewsTests : ProductReviewIntegrationTest
{
  [Fact]
  public async Task GetReviews_WithExistingProductId_WithExistingReviews_ReturnsOnlyApprovedReviews()
  {
    var product = await AddProduct();
    var review1 = await AddReview(product.Id);
    var review2 = await AddReview(product.Id);

    await ApproveReview(product.Id, review1.Id);

    var reviews = await GetApprovedProductReviews(product.Id);

    reviews.Any(rev => rev.Id == review2.Id).Should().BeFalse();
    reviews.Any(rev => rev.Id == review1.Id).Should().BeTrue();
  }
  
 
}