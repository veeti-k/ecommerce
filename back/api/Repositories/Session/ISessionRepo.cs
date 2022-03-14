using System.Linq.Expressions;

namespace api.Repositories.Session;

public interface ISessionRepo
{
  public Task<Models.Session?> GetOneByFilter(Expression<Func<Models.Session, bool>> aFilter);
  public Task<IEnumerable<Models.Session?>> GetManyByFilter(Expression<Func<Models.Session, bool>> aFilter);
  public Task Create(Models.Session aSession);
  public Task Remove(Models.Session aSession);
  public Task Update(Models.Session aSession);
}