using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Auth.Register;
using api.Specifications.User;
using api.Utils;
using api.Utils.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Auth;

public class Register : EndpointBaseAsync
  .WithRequest<RegisterRequest>
  .WithActionResult<RegisterResponse>
{
  private readonly IAuthUtils _authUtils;
  private readonly ITokenUtils _tokenUtils;
  private readonly IGenericRepo<User> _userRepo;
  private readonly IGenericRepo<Session> _sessionRepo;

  public Register(
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

  [HttpPost(Routes.Auth.Register)]
  public override async Task<ActionResult<RegisterResponse>> HandleAsync(
    [FromRoute] RegisterRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userWithSameEmail = await _userRepo
      .Specify(new UserGetByEmailSpec(request.Dto.Email))
      .FirstOrDefaultAsync(cancellationToken);

    if (userWithSameEmail is not null)
      throw new BadRequestException("Email already in use");

    var userWithSamePhoneNumber = await _userRepo
      .Specify(new UserGetByPhoneNumberSpec(request.Dto.PhoneNumber))
      .FirstOrDefaultAsync(cancellationToken);

    if (userWithSamePhoneNumber is not null)
      throw new BadRequestException("Phone number already in use");

    User newUser = new()
    {
      Email = request.Dto.Email,
      Name = request.Dto.Name,
      PhoneNumber = request.Dto.PhoneNumber,
      Flags = 0,
      Password = Hashing.HashToString(request.Dto.Password),
      CreatedAt = DateTimeOffset.UtcNow,
    };
    var addedUser = await _userRepo.Add(newUser);

    Session newSession = new()
    {
      Id = Guid.NewGuid(),
      UserId = addedUser.Id,
      CreatedAt = DateTimeOffset.UtcNow,
      LastUsedAt = DateTimeOffset.UtcNow,
    };
    var addedSession = await _sessionRepo.Add(newSession);

    var accessToken = _tokenUtils
      .CreateAccessToken(addedUser.Id, addedSession.Id, addedUser.Flags);
    var refreshToken = _tokenUtils
      .CreateRefreshToken(addedUser.Id, addedSession.Id, addedUser.Flags);

    _authUtils.SendTokens(accessToken, refreshToken);

    return Ok(new RegisterResponse {AccessToken = accessToken});
  }
}