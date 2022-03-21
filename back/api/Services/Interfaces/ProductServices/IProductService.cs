using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;
using api.Models.Product;

namespace api.Services.Interfaces.ProductServices;

public interface IProductService
{
  public Task<ProductResponse> GetById(int productId);
  public Task<IEnumerable<ShowCaseProductResponse?>> GetAll();
  public Task<ProductResponse> Create(CreateProductDTO dto);
  public Task Remove(int productId);
  public Task<ProductResponse> Update(UpdateProductDTO dto, int productId);
}