namespace api.Mapping.MappedTypes;

public record UserResponse
{
  public int Id { get; init; }
  public string Name { get; init; }
  public string Email { get; init; }
  public string? PhoneNumber { get; init; }
  public long Flags { get; init; }
  public DateTimeOffset CreatedAt { get; init; }
  public IEnumerable<AddressResponse> Addresses { get; init; }
  public IEnumerable<SessionResponse> Sessions { get; init; }
}