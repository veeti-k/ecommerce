using api.Security;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.User.UpdateUserFlags;

public record UpdateUserFlagsDto
{
  public Flags flags { get; init; }
}

public class UpdateUserFlagsRequest
{
  [FromRoute(Name = "userId")] public int UserId { get; set; }
  [FromBody] public UpdateUserFlagsDto Dto { get; set; }
}