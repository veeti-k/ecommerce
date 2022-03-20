using api.Models.Product.Review;

namespace api.Repositories.Interfaces.ProductRepos;

public interface IReviewRepo
{
  public Task<ProductReview?> GetById(Guid reviewId);
  public Task<IEnumerable<ProductReview?>> GetByProductId(int productId);
  public Task<ProductReview> Add(ProductReview productReview);
  public Task Remove(ProductReview productReview);
}