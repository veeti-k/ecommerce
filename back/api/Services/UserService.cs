using System.Linq.Expressions;
using api.DTOs.Auth;
using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
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

  private async Task<User> GetOneByFilter(Expression<Func<User, bool>> filter, bool require)
  {
    var user = await _userRepo.GetOneByFilter(filter);
    if (require && user is null) throw new NotFoundException("User not found");

    return user;
  }

  public async Task<User> GetById(int id, bool require = false) =>
    await GetOneByFilter(user => user.Id == id, require);

  public async Task<User> GetByEmail(string email, bool require = false) =>
    await GetOneByFilter(user => user.Email == email, require);

  public async Task<User> GetByPhoneNumber(string phoneNumber, bool require = false) =>
    await GetOneByFilter(user => user.PhoneNumber == phoneNumber, require);

  public async Task<User> Create(RegisterDTO dto)
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

    await _userRepo.Add(newUser);
    return newUser;
  }

  public async Task Remove(int userId)
  {
    var userToRemove = await GetById(userId, true);

    userToRemove.IsDeleted = true;

    await _userRepo.Update(userToRemove);
  }
}