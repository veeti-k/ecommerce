using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.User.GetUser;

public class GetUserRequest
{
  [FromRoute(Name = "userId")] public int UserId { get; set; }
}