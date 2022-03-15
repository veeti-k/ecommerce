using System.Linq.Expressions;

namespace api.Repositories.Interfaces;

public interface IUserRepo
{
  public Task<Models.User?> GetOneByFilter(Expression<Func<Models.User, bool>> aFilter);
  public Task<IEnumerable<Models.User?>> GetManyByFilter(Expression<Func<Models.User, bool>> aFilter);
  public Task Add(Models.User user);
  public Task Remove(Models.User user);
}