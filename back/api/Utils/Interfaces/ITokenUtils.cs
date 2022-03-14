using api.Models;

namespace api.Utils.Interfaces;

public interface ITokenUtils
{
  public string CreateAccessToken(Guid aUserId, Guid sessionId);
  public string CreateRefreshToken(Guid aUserId, Guid sessionId);
}