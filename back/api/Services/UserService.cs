﻿using api.DTOs;
using api.Exceptions;
using api.Mapping.MappedTypes;
using api.Repositories.Interfaces;
using api.Security;
using api.Services.Interfaces;
using AutoMapper;

namespace api.Services;

public class UserService : IUserService
{
  private readonly IMapper _mapper;
  private readonly IUserRepo _userRepo;
  private readonly IContextService _contextService;

  public UserService(
    IMapper aMapper,
    IUserRepo userRepo,
    IContextService aContextService)
  {
    _mapper = aMapper;
    _userRepo = userRepo;
    _contextService = aContextService;
  }

  public async Task<UserResponse> GetById(int userId)
  {
    var user = await _userRepo.GetById(userId);
    if (user is null) throw new NotFoundException("User not found");

    return _mapper.Map<UserResponse>(user);
  }

  public async Task<UserResponse> UpdateFlags(UpdateUserFlagsDTO dto, int userId)
  {
    var user = await _userRepo.GetById(userId);
    if (user is null) throw new NotFoundException("User not found");

    var currentUserId = _contextService.GetCurrentUserId();

    if (currentUserId == userId && !Flags.HasFlag(dto.flags, Flags.ADMINISTRATOR))
      throw new BadRequestException("You can not remove the flag ADMINISTRATOR from yourself");

    user.Flags = dto.flags;

    var updated = await _userRepo.Update(user);

    return _mapper.Map<UserResponse>(updated);
  }

  public async Task<UserResponse> Update(UpdateUserDTO dto, int userId)
  {
    var user = await _userRepo.GetById(userId);
    if (user is null) throw new NotFoundException("User not found");

    user.Name = dto.Name ?? user.Name;
    user.PhoneNumber = dto.PhoneNumber ?? user.PhoneNumber;
    user.Email = dto.Email ?? user.Email;

    var updated = await _userRepo.Update(user);

    return _mapper.Map<UserResponse>(updated);
  }

  public async Task Remove(int userId)
  {
    var userToRemove = await _userRepo.GetById(userId);
    if (userToRemove is null)
      throw new NotFoundException("User not found");

    await _userRepo.Remove(userToRemove);
  }
}