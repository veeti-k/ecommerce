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

  public string CreateRefreshTokenCookie(string aCookieValue) =>
    BuildRefreshTokenCookie(aCookieValue);

  public string CreateExpiredRefreshTokenCookie() =>
    BuildRefreshTokenCookie("", true);

  private string BuildRefreshTokenCookie(string aCookieValue, bool expired = false)
  {
    if (expired)
      return $"{_tokenOptions.RefreshTokenCookieName}={aCookieValue}; SameSite=Strict; Secure; HttpOnly; Path={_tokenOptions.RefreshTokenCookiePath}; Max-Age=0;";

    return
      $"{_tokenOptions.RefreshTokenCookieName}={aCookieValue}; SameSite=Strict; Secure; HttpOnly; Path={_tokenOptions.RefreshTokenCookiePath}; Max-Age={_tokenOptions.RefreshTokenCookieExpSeconds};";
  }
}