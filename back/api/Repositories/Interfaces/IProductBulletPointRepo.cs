using api.Models;

namespace api.Repositories.Interfaces;

public interface IProductBulletPointRepo : IGenericRepo<ProductBulletPoint>
{
  public Task<IEnumerable<ProductBulletPoint>> GetManyByProductId(int productId);
}