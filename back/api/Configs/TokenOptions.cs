namespace api.Configs;

public class TokenOptions
{
  public const string Position = "TokenOptions";

  public string RefreshSecret { get; set; }
  public string RefreshIss { get; set; }
  public string RefreshAud { get; set; }
  public long RefreshExpSeconds { get; set; }
  public string RefreshTokenCookieName { get; set; }
  public long RefreshTokenCookieExpSeconds { get; set; }
  public string RefreshTokenCookiePath { get; set; }
  public string AccessSecret { get; set; }
  public string AccessIss { get; set; }
  public string AccessAud { get; set; }
  public long AccessExpSeconds { get; set; }
  public string AccessTokenHeaderName { get; set; }
}