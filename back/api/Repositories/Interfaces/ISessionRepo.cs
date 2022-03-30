using api.Models.User;

namespace api.Repositories.Interfaces;

public interface ISessionRepo : IGenericRepo<Session>
{
  public Task<IEnumerable<Session?>> GetMany(int userId);
  public Task<Session?> GetOne(int userId, Guid sessionId);
}