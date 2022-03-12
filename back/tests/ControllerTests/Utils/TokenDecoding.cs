using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using api.Configs;
using Microsoft.IdentityModel.Tokens;

namespace tests.ControllerTests.Utils;

public class TokenDecoding
{
  public JwtSecurityToken DecodeRefreshToken(string aToken)
  {
    var handler = new JwtSecurityTokenHandler();
    var validationParams = new TokenValidationParameters()
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateLifetime = true,
      ValidateIssuerSigningKey = true,

      RequireAudience = true,
      RequireSignedTokens = true,
      RequireExpirationTime = true,
      ClockSkew = TimeSpan.Zero,

      ValidIssuer = TokenConfig.RefreshIss,
      ValidAudience = TokenConfig.RefreshAud,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenConfig.RefreshSecret)),
    };

    handler.ValidateToken(aToken, validationParams, out var token);
    return token as JwtSecurityToken;
  }
  
  public JwtSecurityToken DecodeAccessToken(string aToken)
  {
    var handler = new JwtSecurityTokenHandler();
    var validationParams = new TokenValidationParameters()
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateLifetime = true,
      ValidateIssuerSigningKey = true,

      RequireAudience = true,
      RequireSignedTokens = true,
      RequireExpirationTime = true,
      ClockSkew = TimeSpan.Zero,

      ValidIssuer = TokenConfig.AccessIss,
      ValidAudience = TokenConfig.AccessAud,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenConfig.AccessSecret)),
    };
    
    handler.ValidateToken(aToken, validationParams, out var token);
    return token as JwtSecurityToken;
  }
}