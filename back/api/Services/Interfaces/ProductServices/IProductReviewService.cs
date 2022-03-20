using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;

namespace api.Services.Interfaces.ProductServices;

public interface IProductReviewService
{
  public Task<ProductReviewResponse> CreateReview(CreateProductReviewDTO dto, int productId);
  public Task<IEnumerable<ProductReviewResponse>> GetProductReviews(int productId);
  public Task<ProductReviewResponse> ApproveProductReview(int productId, Guid reviewId);

  public Task RemoveReview(Guid reviewId);
}