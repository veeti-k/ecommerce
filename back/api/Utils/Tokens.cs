using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Configs;
using api.Models;
using Microsoft.IdentityModel.Tokens;

namespace api.Utils;

public static class Tokens
{
  public static string CreateRefreshToken(User user)
  {
    var claims = new[]
    {
      new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
      new Claim(ClaimTypes.Version, user.TokenVersion.ToString())
    };

    var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(TokenConfig.RefreshSecret));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
    var tokenDescriptor = new JwtSecurityToken(
      TokenConfig.RefreshIss,
      TokenConfig.RefreshAud,
      claims,
      expires: DateTime.Now.AddDays(7),
      signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }

  public static string CreateAccessToken(User user)
  {
    var claims = new[]
    {
      new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
      new Claim(ClaimTypes.Version, user.TokenVersion.ToString())
    };

    var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(TokenConfig.AccessSecret));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
    var tokenDescriptor = new JwtSecurityToken(
      TokenConfig.AccessIss,
      TokenConfig.AccessAud,
      claims,
      expires: DateTime.Now.AddMinutes(15),
      signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }

  public static void SendTokens(
    HttpContext httpContext,
    string aAccessToken,
    string aRefreshToken
  )
  {
    httpContext.Response.Headers.SetCookie = CreateRefreshTokenCookie(aRefreshToken);
    httpContext.Response.Headers[TokenConfig.AccessTokenHeader] = aAccessToken;
  }

  private static string CreateRefreshTokenCookie(string aCookieValue)
  {
    return
      $"{TokenConfig.RefreshTokenCookie}={aCookieValue}; SameSite=Strict; Secure; HttpOnly; Path=/api/auth/tokens; Max-Age={TokenConfig.RefreshTokenCookieMaxAge};";
  }
}