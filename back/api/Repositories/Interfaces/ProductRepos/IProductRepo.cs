using api.Models.Product;

namespace api.Repositories.Interfaces.ProductRepos;

public interface IProductRepo
{
  public Task<Product?> GetById(int productId);
  public Task<IEnumerable<Product?>> GetAll();
  public Task<Product> Add(Product product);
  public Task<Product> Update(Product product);
}