using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.User;
using api.RequestsAndResponses.User.GetUser;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.User;

public class GetUser : EndpointBaseAsync
  .WithRequest<GetUserRequest>
  .WithActionResult<UserResponse>
{
  private readonly IMapper _mapper;
  private readonly IUserRepo _userRepo;

  public GetUser(IUserRepo userRepo, IMapper mapper)
  {
    _userRepo = userRepo;
    _mapper = mapper;
  }

  [Authorize(Policy = Policies.ViewUsers)]
  [HttpGet(Routes.Users.UserRoot)]
  public override async Task<ActionResult<UserResponse>> HandleAsync(
    [FromRoute] GetUserRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var user = await _userRepo.GetOneWithSessionsAndAddresses(request.UserId);
    if (user is null) throw new UserNotFoundException(request.UserId);

    return Ok(_mapper.Map<UserResponse>(user));
  }
}