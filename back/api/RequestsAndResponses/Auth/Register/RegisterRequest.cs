using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Auth.Register;

public record RegisterDto
{
  public string Email { get; init; }
  public string Password { get; init; }
  public string Name { get; init; }
  public string? PhoneNumber { get; init; }
  public bool isTestAccount { get; init; }
}

public class RegisterRequest
{
  [FromBody] public RegisterDto Dto { get; set; }
}