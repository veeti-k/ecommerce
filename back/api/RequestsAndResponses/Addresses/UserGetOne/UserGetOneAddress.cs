using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Addresses.UserGetOne;

public class UserGetOneAddress
{
  [FromRoute(Name = "userId")] public int UserId { get; set; }
  [FromRoute(Name = "addressId")] public Guid AddressId { get; set; }
}