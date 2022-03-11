namespace api.Configs;

public class JwtConfig
{
  public string RefreshSecret { get; set; }
  public string RefreshIss { get; set; }
  public string RefreshAud { get; set; }
  
  public string AccessSecret { get; set; }
  public string AccessIss { get; set; }
  public string AccessAud { get; set; }
}