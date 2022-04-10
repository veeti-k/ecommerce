using api.Models;

namespace api.Repositories.Interfaces;

public interface IProductsCategoriesRepo : IGenericRepo<ProductsCategories>
{
  public Task<List<ProductsCategories?>> GetManyByProductId(int productId);
}