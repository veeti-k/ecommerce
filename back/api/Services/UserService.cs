using api.DTOs.Auth;
using api.Exceptions;
using api.Mapping.MappedTypes;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Services.Interfaces;
using api.Utils;
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

  public async Task<UserResponse> GetById(int id, bool required = true)
  {
    var user = await _userRepo.GetOneByFilter(user => user.Id == id);
    if (required && user is null) throw new NotFoundException("User not found");

    return _mapper.Map<UserResponse>(user);
  }

  public async Task<User?> GetByEmail(string email) =>
    await _userRepo.GetOneByFilter(user => user.Email == email);

  private async Task<User?> GetByPhoneNumber(string phoneNumber) =>
    await _userRepo.GetOneByFilter(user => user.PhoneNumber == phoneNumber);

  public async Task<UserResponse> Create(RegisterDTO dto)
  {
    if (await GetByEmail(dto.Email) != null)
      throw new BadRequestException("Email in use");

    if (await GetByPhoneNumber(dto.PhoneNumber) != null)
      throw new BadRequestException("Phone number in use");

    User newUser = new()
    {
      Email = dto.Email,
      Name = $"{dto.FirstName} {dto.LastName}",
      PhoneNumber = dto.PhoneNumber,
      Flags = 0,
      Password = Hashing.HashToString(dto.Password),
      CreatedAt = DateTimeOffset.UtcNow,
    };

    var createdUser = await _userRepo.Add(newUser);
    return _mapper.Map<UserResponse>(createdUser);
  }

  public async Task Remove(int userId)
  {
    var userToRemove = await _userRepo.GetById(userId);
    if (userToRemove is null)
      throw new NotFoundException("User not found");

    await _userRepo.Remove(userToRemove);
  }
}