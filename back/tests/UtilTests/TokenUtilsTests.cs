﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using api.Utils;
using FluentAssertions;
using Microsoft.IdentityModel.Tokens;
using tests.ServiceTests;
using Xunit;

namespace tests.UtilTests;

[Collection("TokenThings")]
public class TokenUtilsTests
{
  private readonly TokenUtils _tokenUtils;

  private readonly TokenValidationParameters _accessTokenValidationParameters;
  private readonly TokenValidationParameters _refreshTokenValidationParameters;

  private readonly int randomNumber = new Random().Next(1, Int32.MaxValue);
  private readonly long randomLong = new Random().Next(1, 10);

  public TokenUtilsTests(TokenThingsFixture tokenThings)
  {
    _accessTokenValidationParameters = tokenThings.AccessTokenValidationParameters;
    _refreshTokenValidationParameters = tokenThings.RefreshTokenValidationParameters;

    _tokenUtils = new TokenUtils(tokenThings.TokenOptions);
  }

  [Fact]
  public void CreateAccessToken_ReturnsCreatedToken_TokenIsValid()
  {
    var userId = randomNumber;
    var sessionId = Guid.NewGuid();
    var flags = randomLong;

    var resultToken = _tokenUtils.CreateAccessToken(userId, sessionId, flags);

    resultToken.Should().NotBeNull();

    new JwtSecurityTokenHandler()
      .ValidateToken(resultToken, _accessTokenValidationParameters,
        out var token);

    var claims = (token as JwtSecurityToken).Claims;

    claims.Count().Should().Be(6);

    claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)
      .Value.Should().Be(userId.ToString());

    claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Version)
      .Value.Should().Be(sessionId.ToString());

    claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Sid)
      .Value.Should().Be(flags.ToString());
  }

  [Fact]
  public void CreateRefreshToken_ReturnsCreatedToken_TokenIsValid()
  {
    var userId = randomNumber;
    var sessionId = Guid.NewGuid();
    var flags = randomLong;

    var resultToken = _tokenUtils.CreateRefreshToken(userId, sessionId, flags);

    resultToken.Should().NotBeNull();

    new JwtSecurityTokenHandler()
      .ValidateToken(resultToken, _refreshTokenValidationParameters,
        out var token);

    var claims = (token as JwtSecurityToken).Claims;

    claims.Count().Should().Be(6);

    claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)
      .Value.Should().Be(userId.ToString());

    claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Version)
      .Value.Should().Be(sessionId.ToString());

    claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Sid)
      .Value.Should().Be(flags.ToString());
  }
}