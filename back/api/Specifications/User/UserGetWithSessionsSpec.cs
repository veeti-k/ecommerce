using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Specifications.User;

public class UserGetWithSessionsSpec : BaseSpec<Models.User.User>
{
  public UserGetWithSessionsSpec(int userId)
  {
    Criteria = user => user.Id == userId;
    Include(users => users.Include(user => user.Sessions));
  }
}