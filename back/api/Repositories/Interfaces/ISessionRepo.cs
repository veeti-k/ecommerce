using System.Linq.Expressions;
using api.Models.User;

namespace api.Repositories.Interfaces;

public interface ISessionRepo
{
  public Task<Session?> GetOneByFilter(Expression<Func<Session, bool>> aFilter);
  public Task<IEnumerable<Session?>> GetManyByFilter(Expression<Func<Session, bool>> aFilter);
  public Task Create(Session aSession);
  public Task Remove(Session aSession);
  public Task Update(Session aSession);
}