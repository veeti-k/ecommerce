namespace api.DTOs.Auth;

public record RegisterDTO
{
  public string Email { get; init; }
  public string Password { get; init; }
  public string FirstName { get; init; }
  public string LastName { get; init; }
  public string? PhoneNumber { get; init; }
}