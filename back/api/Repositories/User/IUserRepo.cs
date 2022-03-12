namespace api.Repositories.User;

public interface IUserRepo
{
  public Task<Models.User?> GetOneByPhoneNumber(string? aPhoneNumber);
  public Task<Models.User?> GetOneById(Guid aId);
  public Task<Models.User?> GetOneByEmail(string aEmail);
  public Task Add(Models.User user);
  public Task Delete(Models.User user);
  public Task Delete(Guid? aId);
}