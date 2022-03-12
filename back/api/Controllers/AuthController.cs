using api.DTOs.Auth;
using api.Models;
using api.Repositories.User;
using api.Utils;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : BaseController
{
  private readonly IUserRepo _userUserRepo;

  public AuthController(IUserRepo userUserRepo)
  {
    _userUserRepo = userUserRepo;
  }

  [HttpPost("register")]
  [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(string))]
  [ProducesResponseType(StatusCodes.Status204NoContent)]
  public async Task<ActionResult<string>> Register(RegisterDTO aDto)
  {
    var samePhoneNumber = await _userUserRepo.GetOneByPhoneNumber(aDto.PhoneNumber); 
    if (samePhoneNumber != null) return Conflict("Phone number in use");

    var sameEmail = await _userUserRepo.GetOneByEmail(aDto.Email);
    if (sameEmail != null) return Conflict("Email in use");
    
    var name = $"{aDto.FirstName} {aDto.LastName}";
    User newUser = new()
    {
      Id = Guid.NewGuid(),
      Email = aDto.Email,
      Name = name,
      Password = Hashing.HashToString(aDto.Password),
      PhoneNumber = aDto.PhoneNumber,
      TokenVersion = Guid.NewGuid()
    };

    await _userUserRepo.Add(newUser);
    
    Tokens.SendTokens(HttpContext, Tokens.CreateAccessToken(newUser), Tokens.CreateRefreshToken(newUser));
    return NoContent();
  }
}