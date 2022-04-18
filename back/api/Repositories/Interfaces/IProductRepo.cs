using api.Models;

namespace api.Repositories.Interfaces;

public interface IProductRepo : IGenericRepo<Product>
{
  public Task<Product?> GetOne(int productId);
  public Task<Product?> GetOneNotDeleted(int productId);
  public Task<Product?> GetOneNotDeletedWithCategories(int productId);
  public Task<List<Product?>> GetManyNotDeleted();
  public Task<List<Product?>> Search(string? query = null, int? categoryId = null);
}