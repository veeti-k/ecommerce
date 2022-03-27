using System;
using System.Text;
using api.Configs;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Xunit;

namespace tests.ServiceTests;

public class TokenThingsFixture
{
  public IOptions<TokenOptions> TokenOptions;
  public TokenValidationParameters AccessTokenValidationParameters;
  public TokenValidationParameters RefreshTokenValidationParameters;

  public TokenThingsFixture()
  {
    TokenOptions = Options.Create(new TokenOptions
    {
      AccessAud = "access-test-aud",
      AccessIss = "access-test-iss",
      AccessSecret = "123456789123456789123456789123456789123456789",
      AccessTokenHeaderName = "access-token",

      RefreshAud = "refresh-test-aud",
      RefreshIss = "refresh-test-iss",
      RefreshSecret = "987654321987654321987654321987654321987654321",
      RefreshTokenCookieName = "refresh-token"
    });

    var tokenOptions = TokenOptions.Value;
    
    AccessTokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateLifetime = true,
      ValidateIssuerSigningKey = true,

      RequireAudience = true,
      RequireSignedTokens = true,
      RequireExpirationTime = true,
      ClockSkew = TimeSpan.Zero,

      ValidIssuer = tokenOptions.AccessIss,
      ValidAudience = tokenOptions.AccessAud,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenOptions.AccessSecret)),
    };
    
    RefreshTokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateLifetime = true,
      ValidateIssuerSigningKey = true,

      RequireAudience = true,
      RequireSignedTokens = true,
      RequireExpirationTime = true,
      ClockSkew = TimeSpan.Zero,

      ValidIssuer = tokenOptions.RefreshIss,
      ValidAudience = tokenOptions.RefreshAud,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenOptions.RefreshSecret)),
    };
  }
}

[CollectionDefinition("TokenThings")]
public class TokenThingsCollection : ICollectionFixture<TokenThingsFixture>
{
}