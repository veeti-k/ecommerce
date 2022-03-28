using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.User;
using api.RequestsAndResponses.User.UpdateUser;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.User;

public class UpdateUser : EndpointBaseAsync
  .WithRequest<UpdateUserRequest>
  .WithActionResult<UserResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Models.User.User> _userRepo;

  public UpdateUser(IMapper mapper, IGenericRepo<Models.User.User> userRepo)
  {
    _mapper = mapper;
    _userRepo = userRepo;
  }

  [Authorize(Policy = Policies.Administrator)]
  [HttpPatch(Routes.Users.UserRoot)]
  public override async Task<ActionResult<UserResponse>> HandleAsync(
    [FromRoute] UpdateUserRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var user = await _userRepo.GetById(request.UserId);
    if (user is null) throw new UserNotFoundException(request.UserId);

    user.Name = request.Dto.Name ?? user.Name;
    user.PhoneNumber = request.Dto.PhoneNumber ?? user.PhoneNumber;
    user.Email = request.Dto.Email ?? user.Email;

    var updated = await _userRepo.Update(user);
    return Ok(_mapper.Map<UserResponse>(updated));
  }
}