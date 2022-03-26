using api.Data;

namespace api.Specifications.Session;

public class SessionGetManySpec : BaseSpec<Models.User.Session>
{
  public SessionGetManySpec(int userId, IEnumerable<Guid> sessionIds)
  {
    Criteria = session => sessionIds.Contains(session.Id) && session.UserId == userId;
  }
}