﻿using api.DTOs.Auth;
using api.Models;
using api.Repositories.User;
using api.Utils;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : BaseController
{
  private readonly IUserRepo _userRepo;

  public AuthController(IUserRepo userRepo)
  {
    _userRepo = userRepo;
  }

  [HttpPost("register")]
  public async Task<ActionResult<string>> Register(RegisterDTO aDto)
  {
    var samePhoneNumber = await _userRepo.GetOneByPhoneNumber(aDto.PhoneNumber); 
    if (samePhoneNumber != null) return Conflict("Phone number in use");

    var sameEmail = await _userRepo.GetOneByEmail(aDto.Email);
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

    await _userRepo.Add(newUser);
    
    Tokens.SendTokens(HttpContext, Tokens.CreateAccessToken(newUser), Tokens.CreateRefreshToken(newUser));
    return NoContent();
  }
}