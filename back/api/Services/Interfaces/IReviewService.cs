using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;

namespace api.Services.Interfaces;

public interface IReviewService
{
  public Task<ProductReviewCommentResponse> CreateComment(
    CreateProductReviewCommentDTO dto,
    Guid reviewId,
    int productId);

  public Task<ProductReviewResponse> CreateReview(CreateProductReviewDTO dto, int productId);
  public Task<IEnumerable<ProductReviewResponse>> GetProductReviews(int productId);
  public Task RemoveReview(Guid reviewId);
  public Task RemoveComment(Guid commentId);
}