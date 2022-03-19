using api.Models;
using api.Models.Product.Question;

namespace api.Repositories.Interfaces.ProductRepos;

public interface IProductQuestionRepo
{
  public Task<ProductQuestion?> GetById(Guid reviewId);
  public Task<IEnumerable<ProductQuestion?>> GetByProductId(int productId);
  public Task<ProductQuestion> Add(ProductQuestion productReview);
  public Task Remove(ProductQuestion productReview);
}