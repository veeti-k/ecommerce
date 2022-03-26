using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.User.UpdateUser;

public record UpdateUserDto
{
  public string? Name { get; init; }
  public string? Email { get; init; }
  public string? PhoneNumber { get; init; }
}

public class UpdateUserRequest
{
 [FromRoute(Name = "userId")] public int UserId { get; set; } 
 [FromBody] public UpdateUserDto Dto { get; set; }
}