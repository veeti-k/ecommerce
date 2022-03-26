using api.Data;
using Z.EntityFramework.Plus;

namespace api.Specifications.ProductReview;

public class ProductReviewGetApprovedByProductIdSpec : BaseSpec<Models.Product.Review.ProductReview>
{
  public ProductReviewGetApprovedByProductIdSpec(int productId)
  {
    Criteria = review => review.ProductId == productId && review.IsApproved;
    Include( review => review
      .IncludeFilter(review => review.Comments.Where(comment => comment.IsApproved)));
  }
}