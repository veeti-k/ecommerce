using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Sessions.MeDelete;

public class MeDeleteSessionsRequest
{
  [FromRoute(Name = "sessionId")] public Guid SessionId { get; set; }
}