using api.DTOs;
using api.Models.User;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("users")]
[Authorize]
public class SessionController : BaseController
{
  private readonly ISessionService _sessionService;

  public SessionController(ISessionService aSessionService)
  {
    _sessionService = aSessionService;
  }

  [HttpDelete("me/sessions")]
  public async Task<ActionResult> InvalidateSessionsMe(InvalidateSessionDTO dto)
  {
    var userId = GetUserId().GetValueOrDefault();

    await _sessionService.RemoveMany(dto.SessionIds, userId);

    return NoContent();
  }

  [HttpDelete("{userId:int}/sessions")]
  public async Task<ActionResult> InvalidateSessionsUser(int userId, InvalidateSessionDTO dto)
  {
    await _sessionService.RemoveMany(dto.SessionIds, userId);

    return NoContent();
  }
}