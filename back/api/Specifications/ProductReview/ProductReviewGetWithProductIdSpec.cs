using api.Data;

namespace api.Specifications.ProductReview;

public class ProductReviewGetWithProductIdSpec : BaseSpec<Models.Product.Review.ProductReview>
{
  public ProductReviewGetWithProductIdSpec(int productId)
  {
    Criteria = review => review.ProductId == productId;
  }
}