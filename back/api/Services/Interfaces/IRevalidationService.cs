namespace api.Services.Interfaces;

public interface IRevalidationService
{
  public Task<RevalidationResponse> RevalidateProduct(int productId);

  public Task<RevalidationResponse> RevalidateProductQuestionAnswer(int productId, Guid productQuestionId,
    Guid productQuestionAnswerId);

  public Task<RevalidationResponse> RevalidateProductReviewComment(int productId, Guid productReviewId,
    Guid productReviewCommentId);
}