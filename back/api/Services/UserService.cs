using System.Linq.Expressions;
using api.DTOs.Auth;
using api.Exceptions;
using api.Models;
using api.Repositories.User;
using api.Services.Interfaces;
using api.Utils;

namespace api.Services;

public class UserService : IUserService
{
  private readonly IUserRepo _userRepo;

  public UserService(IUserRepo userRepo)
  {
    _userRepo = userRepo;
  }

  private async Task<User> GetOneByFilter(Expression<Func<User, bool>> aFilter, bool require)
  {
    var user = await _userRepo.GetOneByFilter(aFilter);
    if (require && user == null) throw new NotFoundException("User not found");

    return user;
  }

  public async Task<User> GetById(Guid aId, bool require = false) =>
    await GetOneByFilter(user => user.Id == aId, require);

  public async Task<User> GetByEmail(string aEmail, bool require = false) =>
    await GetOneByFilter(user => user.Email == aEmail, require);

  public async Task<User> GetByPhoneNumber(string aPhoneNumber, bool require = false) =>
    await GetOneByFilter(user => user.PhoneNumber == aPhoneNumber, require);

  public async Task<User> Create(RegisterDTO aDto)
  {
    if (await GetByEmail(aDto.Email) != null)
      throw new BadRequestException("Email in use");

    if (await GetByPhoneNumber(aDto.PhoneNumber) != null)
      throw new BadRequestException("Phone number in use");

    User newUser = new()
    {
      Id = Guid.NewGuid(),
      Email = aDto.Email,
      Name = $"{aDto.FirstName} {aDto.LastName}",
      PhoneNumber = aDto.PhoneNumber,
      isTestAccount = aDto.isTestAccount,
      Password = Hashing.HashToString(aDto.Password),
      CreatedAt = DateTime.UtcNow.ToString("o")
    };

    await _userRepo.Add(newUser);
    return newUser;
  }

  public async Task Remove(User aUser)
  {
    var userToRemove = await GetById(aUser.Id, true);
    await _userRepo.Remove(userToRemove);
  }

  public async Task Remove(Guid aId)
  {
    var userToRemove = await GetById(aId, true);
    await _userRepo.Remove(userToRemove);
  }
}