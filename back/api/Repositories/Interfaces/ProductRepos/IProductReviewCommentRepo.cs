using api.Models;
using api.Models.Product.Review;

namespace api.Repositories.Interfaces.ProductRepos;

public interface IProductReviewCommentRepo
{
  public Task<ProductReviewComment?> GetById(Guid commentId);
  public Task<ProductReviewComment> Add(ProductReviewComment productReviewComment);
  public Task Remove(ProductReviewComment productReviewComment);
}