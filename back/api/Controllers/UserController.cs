using api.Mapping.MappedTypes;
using api.Services.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("users")]
public class UserController : BaseController
{
  private readonly IUserService _userService;
  private readonly IMapper _mapper;

  public UserController(IUserService aUserService, IMapper mapper)
  {
    _userService = aUserService;
    _mapper = mapper;
  }

  [HttpGet("me")]
  [Authorize]
  public async Task<ActionResult<UserResponse>> GetMe()
  {
    var userId = GetUserId().GetValueOrDefault();
    var currentSessionId = GetSessionId().GetValueOrDefault();

    var user = await _userService.GetById(userId);

    var mappedResponse = _mapper.Map<UserResponse>(user);

    // mark current session as true
    foreach (var session in mappedResponse.Sessions)
      if (session.Id == currentSessionId)
        session.isCurrentSession = true;

    return Ok(mappedResponse);
  }
}