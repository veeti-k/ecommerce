using api.Security;

namespace api.Utils.Interfaces;

public interface ITokenUtils
{
  public string CreateAccessToken(int userId, Guid sessionId, Flags userFlags);
  public string CreateRefreshToken(int userId, Guid sessionId, Flags userFlags);
}