using api.Configs;
using api.Utils.Interfaces;
using Microsoft.Extensions.Options;

namespace api.Utils;

public class AuthUtils : IAuthUtils
{
  private readonly ICookieUtils _cookieUtils;
  private readonly TokenOptions _tokenOptions;
  private readonly IHttpContextAccessor _accessor;

  public AuthUtils(
    ICookieUtils aCookieUtils,
    IHttpContextAccessor aAccessor,
    IOptions<TokenOptions> aTokenOptions
  )
  {
    _accessor = aAccessor;
    _cookieUtils = aCookieUtils;
    _tokenOptions = aTokenOptions.Value;
  }

  public void SendTokens(string aAccessToken, string aRefreshToken)
  {
    var context = _accessor.HttpContext;
    if (context is null) return;

    context.Response.Headers.SetCookie =
      _cookieUtils.CreateRefreshTokenCookie(aRefreshToken).ToString();

    context.Response
      .Headers[_tokenOptions.AccessTokenHeaderName] = aAccessToken;
  }

  public void SendLogout()
  {
    var context = _accessor.HttpContext;
    if (context is null) return;

    context.Response.Headers
      .SetCookie = _cookieUtils.CreateExpiredRefreshTokenCookie().ToString();

    context.Response
      .Headers[_tokenOptions.AccessTokenHeaderName] = "";
  }
}