using api.Models;
using api.RequestsAndResponses.Product.Add;

namespace api.Services.Interfaces;

public interface IZincService
{
  public Task AddProduct(Product product, List<BulletPointDto> bulletPoints, string imageLink);
  public Task UpdateProduct(Product product, List<BulletPointDto> bulletPoints, string imageLink);
  public Task<IEnumerable<ZincProduct>> SearchWithString(string query);
  public Task<IEnumerable<ZincProduct>> SearchWithCategoryIds(IEnumerable<int> categoryIds);
}