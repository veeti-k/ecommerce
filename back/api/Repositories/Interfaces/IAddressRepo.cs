using System.Linq.Expressions;
using api.Models.User;

namespace api.Repositories.Interfaces;

public interface IAddressRepo
{
  public Task<Address?> GetOneByFilter(Expression<Func<Address, bool>> aFilter);
  public Task<IEnumerable<Address?>> GetManyByFilter(Expression<Func<Address, bool>> aFilter);
  public Task<Address> Add(Address aAddress);
  public Task<Address> Update(Address aAddress);
}