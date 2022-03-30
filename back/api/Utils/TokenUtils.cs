using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Configs;
using api.Security;
using api.Utils.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace api.Utils;

public class TokenUtils : ITokenUtils
{
  private readonly TokenOptions _tokenOptions;

  private readonly string SecurityAlg = SecurityAlgorithms.HmacSha256Signature;

  public TokenUtils(IOptions<TokenOptions> aTokenOptions)
  {
    _tokenOptions = aTokenOptions.Value;
  }

  public string CreateAccessToken(int userId, Guid sessionId, Flags userFlags)
  {
    var claims = new[]
    {
      new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
      new Claim(ClaimTypes.Version, sessionId.ToString()),
      new Claim(ClaimTypes.Sid, ((long)userFlags).ToString())
    };

    var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(_tokenOptions.AccessSecret));
    var credentials = new SigningCredentials(securityKey, SecurityAlg);
    var tokenDescriptor = new JwtSecurityToken(
      _tokenOptions.AccessIss,
      _tokenOptions.AccessAud,
      claims,
      expires: DateTime.Now.AddSeconds(_tokenOptions.AccessExpSeconds),
      signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }

  public string CreateRefreshToken(int userId, Guid sessionId, Flags userFlags)
  {
    var claims = new[]
    {
      new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
      new Claim(ClaimTypes.Version, sessionId.ToString()),
      new Claim(ClaimTypes.Sid, ((long)userFlags).ToString())
    };

    var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(_tokenOptions.RefreshSecret));
    var credentials = new SigningCredentials(securityKey, SecurityAlg);
    var tokenDescriptor = new JwtSecurityToken(
      _tokenOptions.RefreshIss,
      _tokenOptions.RefreshAud,
      claims,
      expires: DateTime.Now.AddSeconds(_tokenOptions.RefreshExpSeconds),
      signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }
}