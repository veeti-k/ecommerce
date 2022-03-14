using System;
using api.Configs;
using api.Utils;
using FluentAssertions;
using Xunit;

namespace tests.ServiceTests.UtilTests;

[Collection("TokenThings")]
public class CookieUtilsTests
{
  private CookieUtils _cookieUtils;
  private readonly TokenOptions _tokenOptions;

  public CookieUtilsTests(TokenThingsFixture tokenThings)
  {
    _tokenOptions = tokenThings.TokenOptions.Value;
    _cookieUtils = new CookieUtils(tokenThings.TokenOptions);
  }

  [Fact]
  public void CreateRefreshTokenCookie_ReturnsACookie_WithCorrectValue_WithValuesFromConfig()
  {
    var cookieValue = Guid.NewGuid().ToString();

    var cookie = _cookieUtils.CreateRefreshTokenCookie(cookieValue);

    cookie.Should().NotBeNull();

    cookie.Name.Should().Be(_tokenOptions.RefreshTokenCookieName);
    cookie.Value.Should().Be(cookieValue);
    cookie.Path.Should().Be(_tokenOptions.RefreshTokenCookiePath);
    cookie.HttpOnly.Should().BeTrue();
    cookie.Secure.Should().Be(_tokenOptions.IsRefreshTokenCookieSecure);
    cookie.Expired.Should().BeFalse();
    cookie.Expires.Should().BeCloseTo(
      DateTime.Now.AddSeconds(_tokenOptions.RefreshTokenCookieExpSeconds),
      TimeSpan.FromSeconds(5));
  }

  [Fact]
  public void CreateExpiredRefreshTokenCookie_ReturnsACookie_ThatIsExpired_WithCorrectValue_WithValuesFromConfig()
  {
    var cookie = _cookieUtils.CreateExpiredRefreshTokenCookie();

    cookie.Should().NotBeNull();

    cookie.Name.Should().Be(_tokenOptions.RefreshTokenCookieName);
    cookie.Value.Should().BeEmpty();
    cookie.Path.Should().Be(_tokenOptions.RefreshTokenCookiePath);
    cookie.HttpOnly.Should().BeTrue();
    cookie.Secure.Should().Be(_tokenOptions.IsRefreshTokenCookieSecure);
    cookie.Expired.Should().BeTrue();
  }
}