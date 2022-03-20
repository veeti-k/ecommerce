using api.Models.Product.Review;

namespace api.Repositories.Interfaces.ProductRepos;

public interface IProductReviewRepo
{
  public Task<ProductReview?> GetById(Guid reviewId);
  public Task<IEnumerable<ProductReview?>> GetApprovedByProductId(int productId);
  public Task<IEnumerable<ProductReview?>> GetWithCommentsByProductId(int productId);
  public Task<ProductReview> Add(ProductReview productReview);
  public Task<ProductReview> Update(ProductReview productReview, bool saveNow = true);
  public Task Remove(ProductReview productReview);
}