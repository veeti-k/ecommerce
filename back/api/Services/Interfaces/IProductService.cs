using api.DTOs.Product;
using api.Mapping.MappedTypes;
using api.Models.Product;

namespace api.Services.Interfaces;

public interface IProductService
{
  public Task<IEnumerable<ShowCaseProductResponse?>> GetManyShowcaseProducts(string query);
  public Task<ProductPageProductResponse?> GetOneProductPageProduct(int productId);
  public Task<Product> Create(CreateProductDTO dto);
  public Task Remove(int productId);
  public Task<Product> Update(UpdateProductDTO dto, int productId);
}