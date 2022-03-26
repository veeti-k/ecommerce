using api.Data;

namespace api.Specifications.Session;

public class SessionGetOneSpec : BaseSpec<Models.User.Session>
{
  public SessionGetOneSpec(int userId, Guid sessionId)
  {
    Criteria = session => session.Id == sessionId && session.UserId == userId;
  }
}