using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Addresses.UserGetAddresses;

public class UserGetAddressesRequest
{
  [FromRoute(Name = "userId")] public int UserId { get; set; }
}