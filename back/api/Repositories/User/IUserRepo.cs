using System.Linq.Expressions;
using api.DTOs.Auth;

namespace api.Repositories.User;

public interface IUserRepo
{
  public Task<Models.User?> GetOneByFilter(Expression<Func<Models.User, bool>> aFilter);
  public Task<IEnumerable<Models.User?>> GetManyByFilter(Expression<Func<Models.User, bool>> aFilter);
  public Task<Models.User?> GetByPhoneNumber(string aPhoneNumber);
  public Task<Models.User?> GetByEmail(string aEmail);
  public Task<Models.User?> GetById(Guid aId);
  public Task<Models.User> Create(RegisterDTO aDto);
  public Task Remove(Models.User user);
  public Task Remove(Guid? aId);
}