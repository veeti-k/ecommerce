using api.Models.Product;

namespace api.Repositories.Interfaces;

public interface IProductReviewCommentRepo
{
  public Task<ProductReviewComment?> GetById(Guid commentId);
  public Task<ProductReviewComment> Add(ProductReviewComment productReviewComment);
  public Task Remove(ProductReviewComment productReviewComment);
}