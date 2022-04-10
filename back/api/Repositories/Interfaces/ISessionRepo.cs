using api.Models.User;

namespace api.Repositories.Interfaces;

public interface ISessionRepo : IGenericRepo<Session>
{
  public Task<List<Session?>> GetMany(int userId);
  public Task<Session?> GetOne(int userId, Guid sessionId);
}