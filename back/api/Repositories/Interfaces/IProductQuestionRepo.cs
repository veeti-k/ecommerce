using api.Models.Product;

namespace api.Repositories.Interfaces;

public interface IProductQuestionRepo
{
  public Task<ProductQuestion?> GetById(Guid reviewId);
  public Task<IEnumerable<ProductQuestion?>> GetByProductId(int productId);
  public Task<ProductQuestion> Add(ProductQuestion productReview);
  public Task Remove(ProductQuestion productReview);
}