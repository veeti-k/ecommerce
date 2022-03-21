using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;

namespace api.Services.Interfaces.ProductServices;

public interface IProductBulletPointService
{
  public Task<ProductBulletPointResponse> GetById(Guid bulletPointId);
  public Task<IEnumerable<ProductBulletPointResponse>> GetByProductId(int productId);
  public Task<IEnumerable<ProductBulletPointResponse>> CreateMany(CreateProductBulletPointDTO dto, int productId);
  public Task Remove(Guid bulletPointId, int productId);

  public Task<ProductBulletPointResponse> Update(
    UpdateProductBulletPointDTO dto,
    Guid bulletPointId,
    int productId);
}