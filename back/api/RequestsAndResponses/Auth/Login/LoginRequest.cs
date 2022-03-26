using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Auth.Login;

public record LoginDto
{
  public string Email { get; init; }
  public string Password { get; init; }
}

public class LoginRequest
{
  [FromBody] public LoginDto Dto { get; set; }
}