namespace api.DTOs.Auth;

public record LoginDTO
{
  public string Email { get; init; }
  public string Password { get; init; }
}