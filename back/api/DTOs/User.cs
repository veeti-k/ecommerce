using api.Models.User;

namespace api.DTOs;

public record UserResponse
{
  public int Id { get; init; }
  public string Name { get; init; }
  public string Email { get; init; }
  public string? PhoneNumber { get; init; }
  public bool isTestAccount { get; init; }
  public string CreatedAt { get; init; }
  public IEnumerable<AddressResponse> Addresses { get; init; }
  public IEnumerable<SessionResponse> Sessions { get; init; }
}