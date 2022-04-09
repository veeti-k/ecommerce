using api.Models;

namespace api.Repositories.Interfaces;

public interface ICategoryRepo : IGenericRepo<ProductCategory>
{
  public Task<IEnumerable<ProductCategory?>> GetByParentId(int parentId);
}