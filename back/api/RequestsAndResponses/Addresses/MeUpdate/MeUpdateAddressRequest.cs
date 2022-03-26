using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Addresses.MeUpdate;

public record UpdateAddressDto
{
  public string? Name { get; init; }
  public string? PhoneNumber { get; init; }
  public string? Email { get; init; }
  public string? StreetAddress { get; init; }
  public string? City { get; init; }
  public string? State { get; init; }
  public string? Zip { get; init; }
}

public class MeUpdateAddressRequest
{
  [FromRoute(Name = "addressId")] public Guid AddressId { get; set; }
  [FromBody] public UpdateAddressDto Dto { get; set; }
}