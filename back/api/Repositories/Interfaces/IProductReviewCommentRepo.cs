using api.Models.Review;

namespace api.Repositories.Interfaces;

public interface IProductReviewCommentRepo : IGenericRepo<ProductReviewComment>
{
  public Task<ProductReviewComment?> GetOne(Guid reviewId, Guid commentId);
  public Task<ProductReviewComment?> GetOneApproved(Guid reviewId, Guid commentId);
  public Task<List<ProductReviewComment?>> GetMany(Guid reviewId);
  public Task<List<ProductReviewComment?>> GetManyApproved(Guid reviewId);
}