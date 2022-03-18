using System.Linq.Expressions;
using api.Models.Product;

namespace api.Repositories.Interfaces;

public interface IProductRepo
{
  public Task<Product?> GetById(int productId);
  public Task<IEnumerable<Product?>> GetManyWithReviews(Expression<Func<Product, bool>> filter);
  public Task<Product?> GetOneWithEverything(int productId);
  public Task<Product> Add(Product product);
  public Task Remove(Product product);
  public Task Update(Product product);
}