using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Specifications.ProductReview;

public class
  ProductReview_GetManyApproved_WithApprovedComments_ByProductId_Spec : BaseSpec<Models.Product.Review.ProductReview>
{
  public ProductReview_GetManyApproved_WithApprovedComments_ByProductId_Spec(int productId)
  {
    Criteria = review => review.ProductId == productId
                         && review.IsApproved;

    Include(reviews => reviews
      .Include(review => review.Comments.Where(comment => comment.IsApproved)));
  }
}

public class
  ProductReview_GetOneApproved_WithApprovedComments_ByProductId_Spec : BaseSpec<Models.Product.Review.ProductReview>
{
  public ProductReview_GetOneApproved_WithApprovedComments_ByProductId_Spec(int productId, Guid reviewId)
  {
    Criteria = review => review.ProductId == productId
                         && review.Id == reviewId
                         && review.IsApproved;

    Include(reviews => reviews
      .Include(review => review.Comments.Where(comment => comment.IsApproved)));
  }
}

public class ProductReview_GetManyApproved_ByProductId_Spec : BaseSpec<Models.Product.Review.ProductReview>
{
  public ProductReview_GetManyApproved_ByProductId_Spec(int productId)
  {
    Criteria = review => review.ProductId == productId
                         && review.IsApproved;

    Include(reviews => reviews
      .Include(review => review.Comments.Where(comment => comment.IsApproved)));
  }
}

public class ProductReview_GetOneApproved_ByProductId_Spec : BaseSpec<Models.Product.Review.ProductReview>
{
  public ProductReview_GetOneApproved_ByProductId_Spec(int productId, Guid reviewId)
  {
    Criteria = review => review.ProductId == productId
                         && review.Id == reviewId
                         && review.IsApproved;

    Include(reviews => reviews
      .Include(review => review.Comments.Where(comment => comment.IsApproved)));
  }
}