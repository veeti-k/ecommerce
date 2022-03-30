using api.Models.User;

namespace api.Repositories.Interfaces;

public interface IUserRepo : IGenericRepo<User>
{
  public Task<User?> GetOneWithSessions(int userId);
  public Task<User?> GetByEmail(string email);
  public Task<User?> GetByPhoneNumber(string phoneNumber);
}