using api.Models.Product;

namespace api.Repositories.Interfaces;

public interface IReviewRepo
{
  public Task<ProductReview?> GetById(Guid reviewId);
  public Task<ProductReview> Add(ProductReview productReview);
  public Task Remove(ProductReview productReview);
}