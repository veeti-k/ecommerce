namespace api.DTOs;

public record CreateAddressDTO
{
  public string Name { get; init; }
  public string PhoneNumber { get; init; }
  public string Email { get; init; }
  public string Line1 { get; init; }
  public string Line2 { get; init; }
  public string City { get; init; }
  public string State { get; init; }
  public string Zip { get; init; }
}

public record UpdateAddressDTO
{
  public string? Name { get; init; }
  public string? PhoneNumber { get; init; }
  public string? Email { get; init; }
  public string? Line1 { get; init; }
  public string? Line2 { get; init; }
  public string? City { get; init; }
  public string? State { get; init; }
  public string? Zip { get; init; }
}

public record AddressResponse
{
  public Guid Id { get; init; }
  public string Name { get; init; }
  public string PhoneNumber { get; init; }
  public string Email { get; init; }
  public string Line1 { get; init; }
  public string Line2 { get; init; }
  public string City { get; init; }
  public string State { get; init; }
  public string Zip { get; init; }
}