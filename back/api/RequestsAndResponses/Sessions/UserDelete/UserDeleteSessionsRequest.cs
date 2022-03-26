using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Sessions.UserDelete;

public record InvalidateSessionDto
{
  public List<Guid> SessionIds { get; init; }
}

public class UserDeleteSessionsRequest
{
  [FromRoute(Name = "userId")] public int UserId { get; set; }
  [FromBody] public InvalidateSessionDto Dto { get; set; }
}