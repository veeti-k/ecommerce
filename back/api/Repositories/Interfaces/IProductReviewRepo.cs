using api.Models.Review;

namespace api.Repositories.Interfaces;

public interface IProductReviewRepo : IGenericRepo<ProductReview>
{
  public Task<ProductReview?> GetOne(int productId, Guid reviewId);
  public Task<ProductReview?> GetOneApproved(int productId, Guid reviewId);
  public Task<IEnumerable<ProductReview?>> GetMany(int productId);
  public Task<IEnumerable<ProductReview?>> GetManyApproved(int productId);
  public Task<IEnumerable<ProductReview?>> GetManyWithApprovedComments(int productId);
  public Task<IEnumerable<ProductReview?>> GetManyApprovedWithApprovedComments(int productId);
}