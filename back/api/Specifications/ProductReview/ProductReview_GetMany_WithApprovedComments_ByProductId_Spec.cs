using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Specifications.ProductReview;

public class ProductReview_GetMany_WithApprovedComments_ByProductId_Spec : BaseSpec<Models.Product.Review.ProductReview>
{
  public ProductReview_GetMany_WithApprovedComments_ByProductId_Spec(int productId)
  {
    Criteria = review => review.ProductId == productId
                         && review.IsApproved;

    Include(reviews => reviews
      .Include(review => review.Comments.Where(comment => comment.IsApproved)));
  }
}