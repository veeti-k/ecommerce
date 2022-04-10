using api.Models.Review;

namespace api.Repositories.Interfaces;

public interface IProductReviewRepo : IGenericRepo<ProductReview>
{
  public Task<ProductReview?> GetOne(int productId, Guid reviewId);
  public Task<ProductReview?> GetOneApproved(int productId, Guid reviewId);
  public Task<List<ProductReview?>> GetMany(int productId);
  public Task<List<ProductReview?>> GetManyApproved(int productId);
  public Task<List<ProductReview?>> GetManyWithApprovedComments(int productId);
  public Task<List<ProductReview?>> GetManyApprovedWithApprovedComments(int productId);
}