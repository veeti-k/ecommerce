using api.DTOs;
using api.Repositories.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : BaseController
{
  private readonly IUserRepo _userUserRepo;

  public UserController(IUserRepo userUserRepo)
  {
    _userUserRepo = userUserRepo;
  }

  [HttpGet("me")]
  [Authorize]
  public async Task<ActionResult<UserToReturn>> GetMe()
  {
    var userId = GetUserId();
    if (userId == null) return Unauthorized("Invalid userId");

    var user = await _userUserRepo.GetOneById(userId.GetValueOrDefault());
    if (user == null) return NotFound("User not found");

    UserToReturn userToReturn = new()
    {
      Id = user.Id,
      Name = user.Name,
      Email = user.Email,
      PhoneNumber = user.PhoneNumber,
      CreatedAt = user.CreatedAt,
      Addresses = user.Addresses,
      isTestAccount = user.isTestAccount
    };

    return Ok(userToReturn);
  }
}