using api.Exceptions;
using api.Mapping.MappedTypes;
using api.Repositories.Interfaces;
using api.Services.Interfaces;
using AutoMapper;

namespace api.Services;

public class UserService : IUserService
{
  private readonly IUserRepo _userRepo;
  private readonly IMapper _mapper;

  public UserService(IUserRepo userRepo, IMapper aMapper)
  {
    _userRepo = userRepo;
    _mapper = aMapper;
  }

  public async Task<UserResponse> GetById(int id)
  {
    var user = await _userRepo.GetById(id);
    if (user is null) throw new NotFoundException("User not found");

    return _mapper.Map<UserResponse>(user);
  }

  public async Task<UserResponse?> GetByEmail(string email)
  {
    var user = await _userRepo.GetByEmail(email);
    if (user is null) throw new NotFoundException("User not found");

    return _mapper.Map<UserResponse>(user);
  }

  public async Task Remove(int userId)
  {
    var userToRemove = await _userRepo.GetById(userId);
    if (userToRemove is null)
      throw new NotFoundException("User not found");

    await _userRepo.Remove(userToRemove);
  }
}