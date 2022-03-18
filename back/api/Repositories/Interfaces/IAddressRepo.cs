using System.Linq.Expressions;
using api.Models.User;

namespace api.Repositories.Interfaces;

public interface IAddressRepo
{
  public Task<Address?> GetOneByFilter(Expression<Func<Address, bool>> aFilter);
  public Task<IEnumerable<Address?>> GetManyByFilter(Expression<Func<Address, bool>> aFilter);
  public Task Add(Address aAddress);
  public Task Update(Address aAddress);
}