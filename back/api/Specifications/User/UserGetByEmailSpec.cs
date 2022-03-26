using api.Data;

namespace api.Specifications.User;

public class UserGetByEmailSpec : BaseSpec<Models.User.User>
{
  public UserGetByEmailSpec(string email)
  {
    Criteria = user => user.Email == email;
  }
}