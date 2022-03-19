using api.Models.Product;

namespace api.Repositories.Interfaces;

public interface IProductQuestionAnswerRepo
{
  public Task<ProductQuestionAnswer?> GetById(Guid commentId);
  public Task<ProductQuestionAnswer> Add(ProductQuestionAnswer productReviewComment);
  public Task Remove(ProductQuestionAnswer productReviewComment);
}