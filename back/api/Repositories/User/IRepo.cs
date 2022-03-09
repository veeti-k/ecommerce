namespace api.Repositories.User;

public interface IRepo
{
  public Task<Models.User> GetOneById(Guid aId);
}