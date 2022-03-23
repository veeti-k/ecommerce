namespace api.DTOs.Auth;

public record RegisterDTO
{
  public string Email { get; init; }
  public string Password { get; init; }
  public string Name { get; init; }
  public string? PhoneNumber { get; init; }
  public bool isTestAccount { get; init; }
}