using api.DTOs;
using api.Repositories.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : BaseController
{
  private readonly IUserRepo _userRepo;

  public UserController(IUserRepo aUserRepo)
  {
    _userRepo = aUserRepo;
  }

  [HttpGet("me")]
  [Authorize]
  public async Task<ActionResult<UserResponse>> GetMe()
  {
    var userId = GetUserId();

    var user = await _userRepo.GetById(userId);
    if (user == null) return NotFound("User not found");

    UserResponse userResponse = new()
    {
      Id = user.Id,
      Name = user.Name,
      Email = user.Email,
      PhoneNumber = user.PhoneNumber,
      CreatedAt = user.CreatedAt,
      Addresses = user.Addresses,
      isTestAccount = user.isTestAccount
    };

    return Ok(userResponse);
  }
}