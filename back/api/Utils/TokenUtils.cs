using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Configs;
using api.Utils.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace api.Utils;

public class TokenUtils : ITokenUtils
{
  private readonly TokenOptions _tokenOptions;

  public TokenUtils(IOptions<TokenOptions> aTokenOptions)
  {
    _tokenOptions = aTokenOptions.Value;
  }

  public string CreateAccessToken(int userId, Guid aSessionId)
  {
    var claims = new[]
    {
      new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
      new Claim(ClaimTypes.Version, aSessionId.ToString())
    };

    var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(_tokenOptions.AccessSecret));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
    var tokenDescriptor = new JwtSecurityToken(
      _tokenOptions.AccessIss,
      _tokenOptions.AccessAud,
      claims,
      expires: DateTime.Now.AddSeconds(_tokenOptions.AccessExpSeconds),
      signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }

  public string CreateRefreshToken(int userId, Guid aSessionId)
  {
    var claims = new[]
    {
      new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
      new Claim(ClaimTypes.Version, aSessionId.ToString())
    };

    var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(_tokenOptions.RefreshSecret));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
    var tokenDescriptor = new JwtSecurityToken(
      _tokenOptions.RefreshIss,
      _tokenOptions.RefreshAud,
      claims,
      expires: DateTime.Now.AddSeconds(_tokenOptions.RefreshExpSeconds),
      signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }
}