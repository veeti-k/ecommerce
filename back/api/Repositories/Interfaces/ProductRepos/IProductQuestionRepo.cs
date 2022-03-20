using api.Models.Product.Question;

namespace api.Repositories.Interfaces.ProductRepos;

public interface IProductQuestionRepo
{
  public Task<ProductQuestion?> GetById(Guid reviewId);
  public Task<IEnumerable<ProductQuestion?>> GetApprovedWithAnswersByProductId(int productId);
  public Task<ProductQuestion> Add(ProductQuestion productReview);
  public Task<ProductQuestion> Update(ProductQuestion productQuestion, bool saveNow = true);
  public Task Remove(ProductQuestion productReview);
}