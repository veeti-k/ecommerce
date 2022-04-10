using api.RequestsAndResponses.Addresses;
using api.RequestsAndResponses.Sessions;

namespace api.RequestsAndResponses.User;

public record UserResponse
{
  public int Id { get; init; }
  public string Name { get; init; }
  public string Email { get; init; }
  public string? PhoneNumber { get; init; }
  public long Flags { get; init; }
  public DateTimeOffset CreatedAt { get; init; }
  public List<AddressResponse> Addresses { get; init; }
  public List<SessionResponse> Sessions { get; init; }
}