using System.Net;

namespace api.Utils.Interfaces;

public interface ICookieUtils
{
  public Cookie CreateRefreshTokenCookie(string aCookieValue);
  public Cookie CreateExpiredRefreshTokenCookie();
}