using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Addresses.MeDelete;

public class MeDeleteAddressRequest
{
  [FromRoute(Name = "addressId")] public Guid AddressId { get; set; }
}