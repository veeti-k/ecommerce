using api.Models.Product;

namespace api.Repositories.Interfaces.ProductRepos;

public interface IProductBulletPointRepo
{
  public Task<ProductBulletPoint?> GetById(Guid bulletPointId);
  public Task<IEnumerable<ProductBulletPoint?>> GetByProductId(int productId);
  public Task<ProductBulletPoint> Add(ProductBulletPoint bulletPoint, bool saveNow = true);
  public Task<ProductBulletPoint> Update(ProductBulletPoint bulletPoint);
  public Task Remove(ProductBulletPoint bulletPoint);
}