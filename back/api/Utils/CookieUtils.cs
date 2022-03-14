using System.Net;
using api.Configs;
using api.Utils.Interfaces;
using Microsoft.Extensions.Options;

namespace api.Utils;

public class CookieUtils : ICookieUtils
{
  private readonly TokenOptions _tokenOptions;

  public CookieUtils(IOptions<TokenOptions> aTokenOptions)
  {
    _tokenOptions = aTokenOptions.Value;
  }

  public Cookie CreateRefreshTokenCookie(string aCookieValue) =>
    BuildRefreshTokenCookie(aCookieValue);

  public Cookie CreateExpiredRefreshTokenCookie() =>
    BuildRefreshTokenCookie("", true);

  private Cookie BuildRefreshTokenCookie(string aCookieValue, bool expired = false)
  {
    var cookie = new Cookie
    {
      Name = _tokenOptions.RefreshTokenCookieName,
      Value = aCookieValue,
      Path = _tokenOptions.RefreshTokenCookiePath,
      HttpOnly = true,
      Secure = _tokenOptions.IsRefreshTokenCookieSecure,
      Expired = expired
    };

    if (!expired)
      cookie.Expires = DateTime.Now.AddSeconds(_tokenOptions.RefreshTokenCookieExpSeconds);

    return cookie;
  }
}