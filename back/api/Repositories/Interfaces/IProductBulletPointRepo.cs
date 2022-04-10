using api.Models;

namespace api.Repositories.Interfaces;

public interface IProductBulletPointRepo : IGenericRepo<ProductBulletPoint>
{
  public Task<List<ProductBulletPoint>> GetManyByProductId(int productId);
}