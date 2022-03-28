using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Xunit;

namespace tests.UtilsForTesting;

[Collection("TokenThings")]
public class TokenDecodingFixture
{
  public TokenValidationParameters _accessTokenValidationParameters;
  public TokenValidationParameters _refreshTokenValidationParameters;

  public TokenDecodingFixture(
    TokenValidationParameters accessTokenValidationParameters,
    TokenValidationParameters refreshTokenValidationParameters
  )
  {
    _accessTokenValidationParameters = accessTokenValidationParameters;
    _refreshTokenValidationParameters = refreshTokenValidationParameters;
  }

  public JwtSecurityToken DecodeRefreshToken(string aToken)
  {
    var handler = new JwtSecurityTokenHandler();
    var validationParams = _refreshTokenValidationParameters;

    handler.ValidateToken(aToken, validationParams, out var token);
    return token as JwtSecurityToken;
  }

  public JwtSecurityToken DecodeAccessToken(string aToken)
  {
    var handler = new JwtSecurityTokenHandler();
    var validationParams = _accessTokenValidationParameters;

    handler.ValidateToken(aToken, validationParams, out var token);
    return token as JwtSecurityToken;
  }
}

[CollectionDefinition("TokenDecoding")]
public class TokenDecodingCollection : ICollectionFixture<TokenDecodingFixture>
{
}