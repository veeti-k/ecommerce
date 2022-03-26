using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Auth.Login;
using api.Specifications.User;
using api.Utils;
using api.Utils.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Auth;

public class Login : EndpointBaseAsync
  .WithRequest<LoginRequest>
  .WithActionResult<object>
{
  private readonly IAuthUtils _authUtils;
  private readonly ITokenUtils _tokenUtils;
  private readonly IGenericRepo<User> _userRepo;
  private readonly IGenericRepo<Session> _sessionRepo;

  public Login(
    IAuthUtils authUtils,
    ITokenUtils tokenUtils,
    IGenericRepo<User> userRepo,
    IGenericRepo<Session> sessionRepo)
  {
    _authUtils = authUtils;
    _tokenUtils = tokenUtils;
    _userRepo = userRepo;
    _sessionRepo = sessionRepo;
  }

  [HttpPost(Routes.Auth.Login)]
  public override async Task<ActionResult<object>> HandleAsync(
    [FromRoute] LoginRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var existingUser = await _userRepo
      .Specify(new UserGetByEmailSpec(request.Dto.Email))
      .FirstOrDefaultAsync(cancellationToken);
    if (existingUser is null)
      throw new UnauthorizedException("Invalid email");

    var passwordMatch = Hashing.Verify(request.Dto.Password, existingUser.Password);
    if (!passwordMatch) throw new UnauthorizedException("Invalid password");

    Session newSession = new()
    {
      Id = Guid.NewGuid(),
      UserId = existingUser.Id,
      CreatedAt = DateTimeOffset.UtcNow,
      LastUsedAt = DateTimeOffset.UtcNow,
    };

    var addedSession = await _sessionRepo.Add(newSession);

    var accessToken = _tokenUtils
      .CreateAccessToken(existingUser.Id, addedSession.Id, existingUser.Flags);
    var refreshToken = _tokenUtils
      .CreateRefreshToken(existingUser.Id, addedSession.Id, existingUser.Flags);

    _authUtils.SendTokens(accessToken, refreshToken);

    return Ok(new {accessToken});
  }
}