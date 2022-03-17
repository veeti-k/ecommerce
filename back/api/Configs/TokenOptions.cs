namespace api.Configs;

public class TokenOptions
{
  public const string Position = "TokenOptions";

  public string RefreshSecret { get; set; }
  public string RefreshIss { get; set; }
  public string RefreshAud { get; set; }
  public long RefreshExpSeconds { get; set; } = 60 * 60 * 24 * 7; // 7 days
  public string RefreshTokenCookieName { get; set; }
  public long RefreshTokenCookieExpSeconds { get; set; } = 60 * 60 * 24 * 7; // 7 days
  public string RefreshTokenCookiePath { get; set; } = "/api/auth/tokens";
  public bool IsRefreshTokenCookieSecure { get; set; } = false;

  public string AccessSecret { get; set; }
  public string AccessIss { get; set; }
  public string AccessAud { get; set; }
  public long AccessExpSeconds { get; set; } = 60 * 15; // 15 minutes
  public string AccessTokenHeaderName { get; set; }
}