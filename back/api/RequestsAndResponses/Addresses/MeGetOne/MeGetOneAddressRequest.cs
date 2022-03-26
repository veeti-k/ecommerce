using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Addresses.MeGetOne;

public class MeGetOneAddressRequest
{
  [FromRoute(Name = "addressId")] public Guid AddressId { get; set; }
}