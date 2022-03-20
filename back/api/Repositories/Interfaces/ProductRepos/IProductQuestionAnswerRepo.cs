using api.Models.Product.Question;

namespace api.Repositories.Interfaces.ProductRepos;

public interface IProductQuestionAnswerRepo
{
  public Task<ProductQuestionAnswer?> GetById(Guid commentId);
  public Task<ProductQuestionAnswer> Add(ProductQuestionAnswer productReviewComment);
  public Task<ProductQuestionAnswer> Update(ProductQuestionAnswer productReviewComment);
  public Task Remove(ProductQuestionAnswer productReviewComment);
}