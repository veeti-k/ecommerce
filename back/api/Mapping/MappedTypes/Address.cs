namespace api.Mapping.MappedTypes;

public record AddressResponse
{
  public Guid Id { get; init; }
  public string Name { get; init; }
  public string PhoneNumber { get; init; }
  public string Email { get; init; }
  public string StreetAddress { get; init; }
  public string City { get; init; }
  public string State { get; init; }
  public string Zip { get; init; }
}