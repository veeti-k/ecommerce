using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Addresses.Add;

public record AddAddressDto
{
  public string Name { get; init; }
  public string PhoneNumber { get; init; }
  public string Email { get; init; }
  public string StreetAddress { get; init; }
  public string City { get; init; }
  public string State { get; init; }
  public string Zip { get; init; }
}

public class AddAddressRequest
{
  [FromBody] public AddAddressDto Dto { get; set; } 
}