using api.DTOs.Auth;
using api.Models.User;

namespace api.Services.Interfaces;

public interface IUserService
{
  public Task<User> GetById(Guid aId, bool require = false);
  public Task<User> GetByEmail(string aEmail, bool require = false);
  public Task<User> GetByPhoneNumber(string aPhoneNumber, bool require = false);
  public Task<User> Create(RegisterDTO aDto);
  public Task Remove(User user);
  public Task Remove(Guid aId);
}