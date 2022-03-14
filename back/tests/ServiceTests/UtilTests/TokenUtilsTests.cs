using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Utils;
using FluentAssertions;
using Microsoft.IdentityModel.Tokens;
using Xunit;

namespace tests.ServiceTests.UtilTests;

[Collection("TokenThings")]
public class TokenUtilsTests
{
  private readonly TokenUtils _tokenUtils;

  private readonly TokenValidationParameters _accessTokenValidationParameters;
  private readonly TokenValidationParameters _refreshTokenValidationParameters;

  public TokenUtilsTests(TokenThingsFixture tokenThings)
  {
    _accessTokenValidationParameters = tokenThings.AccessTokenValidationParameters;
    _refreshTokenValidationParameters = tokenThings.RefreshTokenValidationParameters;

    var test = tokenThings.AccessTokenValidationParameters;

    _tokenUtils = new TokenUtils(tokenThings.TokenOptions);
  }

  [Fact]
  public void CreateAccessToken_ReturnsCreatedToken_TokenIsValid()
  {
    var userId = Guid.NewGuid();
    var sessionId = Guid.NewGuid();

    var resultToken = _tokenUtils.CreateAccessToken(userId, sessionId);

    resultToken.Should().NotBeNull();

    new JwtSecurityTokenHandler()
      .ValidateToken(resultToken, _accessTokenValidationParameters,
        out var token);

    var claims = (token as JwtSecurityToken).Claims;

    claims.Count().Should().Be(5);

    claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)
      .Value.Should().Be(userId.ToString());

    claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Version)
      .Value.Should().Be(sessionId.ToString());
  }

  [Fact]
  public void CreateRefreshToken_ReturnsCreatedToken_TokenIsValid()
  {
    var userId = Guid.NewGuid();
    var sessionId = Guid.NewGuid();

    var resultToken = _tokenUtils.CreateRefreshToken(userId, sessionId);

    resultToken.Should().NotBeNull();

    new JwtSecurityTokenHandler()
      .ValidateToken(resultToken, _refreshTokenValidationParameters,
        out var token);

    var claims = (token as JwtSecurityToken).Claims;

    claims.Count().Should().Be(5);

    claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)
      .Value.Should().Be(userId.ToString());

    claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Version)
      .Value.Should().Be(sessionId.ToString());
  }
}