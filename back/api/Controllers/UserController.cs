using api.DTOs;
using api.Repositories.User;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : BaseController
{
  private readonly IUserRepo _userRepo;
  private readonly IMapper _mapper;

  public UserController(IUserRepo aUserRepo, IMapper mapper)
  {
    _userRepo = aUserRepo;
    _mapper = mapper;
  }

  [HttpGet("me")]
  [Authorize]
  public async Task<ActionResult<UserResponse>> GetMe()
  {
    var userId = GetUserId();
    var currentSessionId = GetSessionId();

    var user = await _userRepo.GetById(userId);
    if (user == null) return NotFound("User not found");

    var mappedResponse = _mapper.Map<UserResponse>(user);

    foreach (var session in mappedResponse.Sessions)
      if (session.Id == currentSessionId)
        session.isCurrentSession = true;

    return Ok(mappedResponse);
  }
}