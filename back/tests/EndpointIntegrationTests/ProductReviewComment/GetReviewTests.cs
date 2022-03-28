using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductReviewComment;

public class GetReviewTests : ProductReviewCommentIntegrationTest
{
  [Fact]
  public async Task GetReviews_WithApprovedReviews_WithApprovedAndNotApprovedComments_ReturnsOnlyApprovedComments()
  {
    var product = await AddProduct();
    var review = await AddReview(product.Id);
    await ApproveReview(product.Id, review.Id);

    var comment1 = await AddReviewComment(product.Id, review.Id);
    var comment2 = await AddReviewComment(product.Id, review.Id);

    await ApproveReviewComment(product.Id, review.Id, comment1.Id);

    var reviews = await GetApprovedProductReviews(product.Id);

    var theReview = reviews.FirstOrDefault(rev => rev.Id == review.Id);

    theReview.Comments.Any(comment => comment.Id == comment1.Id).Should().BeTrue();
    theReview.Comments.Any(comment => comment.Id == comment2.Id).Should().BeFalse();
  }
  
  // perms are already tested in ../ProductReview/GetReviewTests.cs
}