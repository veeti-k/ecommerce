using System.Net;

namespace api.Utils.Interfaces;

public interface ICookieUtils
{
  public string CreateRefreshTokenCookie(string aCookieValue);
  public string CreateExpiredRefreshTokenCookie();
}