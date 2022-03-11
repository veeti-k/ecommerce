namespace api.Repositories.User;

public interface IRepo
{
  public Task<Models.User> GetOneById(Guid aId);
  public Task<Models.User?> GetOneByEmail(string aEmail);
  public Task Add(Models.User user);
}