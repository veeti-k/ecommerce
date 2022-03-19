using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;
using api.Models;
using api.Models.Product;

namespace api.Services.Interfaces.ProductServices;

public interface IProductService
{
  public Task<Product> GetById(int productId);
  public Task<IEnumerable<ShowCaseProductResponse?>> GetManyShowcaseProducts(string query);
  public Task<ProductPageProductResponse?> GetOneProductPageProduct(int productId);
  public Task<ProductCreatedResponse> Create(CreateProductDTO dto);
  public Task Remove(int productId);
  public Task<ProductUpdatedResponse> Update(UpdateProductDTO dto, int productId);
}