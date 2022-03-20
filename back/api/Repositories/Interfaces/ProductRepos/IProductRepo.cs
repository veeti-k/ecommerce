using System.Linq.Expressions;
using api.Models.Product;

namespace api.Repositories.Interfaces.ProductRepos;

public interface IProductRepo
{
  public Task<Product?> GetById(int productId);
  public Task<Product?> GetWithApprovedReviewsById(int productId);
  public Task<IEnumerable<Product?>> GetManyWithReviews(Expression<Func<Product, bool>> filter);
  public Task<Product?> GetOneWithEverything(int productId);
  public Task<Product> Add(Product product);
  public Task<Product> Update(Product product);
}