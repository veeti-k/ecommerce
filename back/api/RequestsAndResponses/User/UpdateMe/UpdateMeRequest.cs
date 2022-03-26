using api.RequestsAndResponses.User.UpdateUser;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.User.UpdateMe;

public class UpdateMeRequest
{
  [FromBody] public UpdateUserDto Dto { get; set; }
}