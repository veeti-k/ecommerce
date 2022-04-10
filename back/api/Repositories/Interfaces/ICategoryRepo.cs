using api.Models;

namespace api.Repositories.Interfaces;

public interface ICategoryRepo : IGenericRepo<ProductCategory>
{
  public Task<List<ProductCategory?>> GetByParentId(int parentId);
}