namespace api.Repositories.Interfaces;

public interface IGenericRepo<T> where T : class
{
  public Task<IEnumerable<T?>> GetAll();
  public Task<T?> GetById(int id);
  public Task<T?> GetById(Guid id);
  public Task<T> Add(T entity);
  public Task<T> Update(T entity);
  public Task Delete(T entity);
  public Task DeleteMany(IEnumerable<T> entities);
}