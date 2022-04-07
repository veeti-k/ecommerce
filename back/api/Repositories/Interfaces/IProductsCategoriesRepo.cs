using api.Models.Product;

namespace api.Repositories.Interfaces;

public interface IProductsCategoriesRepo : IGenericRepo<ProductsCategories>
{
  public Task<IEnumerable<ProductsCategories?>> GetManyByProductId(int productId);
}