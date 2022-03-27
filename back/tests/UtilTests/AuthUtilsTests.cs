using System;
using api.Configs;
using api.Utils;
using api.Utils.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace tests.ServiceTests.UtilTests;

[Collection("TokenThings")]
public class AuthUtilsTests
{
  private readonly ICookieUtils _cookieUtils;
  private readonly IOptions<TokenOptions> _tokenOptions;

  public AuthUtilsTests(TokenThingsFixture tokenThings)
  {
    _cookieUtils = new CookieUtils(tokenThings.TokenOptions);
    _tokenOptions = tokenThings.TokenOptions;
  }

  [Fact]
  public void SendTokens_SetsCorrectHeaders()
  {
    var accessor = new Mock<IHttpContextAccessor>();
    var fakeContext = new DefaultHttpContext();
    accessor.Setup(acc => acc
        .HttpContext)
      .Returns(fakeContext);

    var refreshToken = Guid.NewGuid().ToString();
    var accessToken = Guid.NewGuid().ToString();

    var authUtils = new AuthUtils(_cookieUtils, accessor.Object, _tokenOptions);
    authUtils.SendTokens(accessToken, refreshToken);

    var headers = fakeContext.Response.Headers;

    headers.SetCookie.ToString().Should()
      .Be(_cookieUtils.CreateRefreshTokenCookie(refreshToken).ToString());

    headers[_tokenOptions.Value.AccessTokenHeaderName].ToString()
      .Should().Be(accessToken);
  }

  [Fact]
  public void SendLogout_SetsCorrectHeaders()
  {
    var accessor = new Mock<IHttpContextAccessor>();
    var fakeContext = new DefaultHttpContext();
    accessor.Setup(acc => acc
        .HttpContext)
      .Returns(fakeContext);

    var authUtils = new AuthUtils(_cookieUtils, accessor.Object, _tokenOptions);
    authUtils.SendLogout();

    var headers = fakeContext.Response.Headers;

    headers.SetCookie.ToString().Should().Be($"{_tokenOptions.Value.RefreshTokenCookieName}=");

    headers[_tokenOptions.Value.AccessTokenHeaderName].ToString().Should().Be("");
  }
}