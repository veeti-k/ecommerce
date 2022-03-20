using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;

namespace api.Services.Interfaces.ProductServices;

public interface IProductReviewCommentService
{
  public Task<ProductReviewCommentResponse> CreateComment(
    CreateProductReviewCommentDTO dto,
    Guid reviewId,
    int productId
  );

  public Task<ProductReviewCommentResponse> ApproveComment(int productId, Guid reviewId, Guid commentId);  
  public Task RemoveComment(int productId, Guid reviewId, Guid commentId);
}