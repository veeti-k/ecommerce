using api.DTOs.Auth;
using api.Models.User;

namespace api.Services.Interfaces;

public interface IUserService
{
  public Task<User> GetById(int id, bool require = false);
  public Task<User> GetByEmail(string email, bool require = false);
  public Task<User> GetByPhoneNumber(string phoneNumber, bool require = false);
  public Task<User> Create(RegisterDTO dto);
  public Task Remove(User user);
  public Task Remove(int id);
}