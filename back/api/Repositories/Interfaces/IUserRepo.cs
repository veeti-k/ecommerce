using System.Linq.Expressions;
using api.Models.User;

namespace api.Repositories.Interfaces;

public interface IUserRepo
{
  public Task<User?> GetById(int userId);
  public Task<User?> GetOneByFilter(Expression<Func<User, bool>> aFilter);
  public Task<IEnumerable<User?>> GetManyByFilter(Expression<Func<User, bool>> aFilter);
  public Task<User> Add(User user);
  public Task Remove(User user);
}