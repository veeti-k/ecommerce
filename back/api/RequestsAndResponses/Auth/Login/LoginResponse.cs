namespace api.RequestsAndResponses.Auth.Login;

public record LoginResponse 
{
  public string AccessToken { get; set; }
}