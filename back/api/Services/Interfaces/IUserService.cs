using api.DTOs.Auth;
using api.Mapping.MappedTypes;
using api.Models.User;

namespace api.Services.Interfaces;

public interface IUserService
{
  public Task<UserResponse> GetById(int id);
  public Task<User?> GetByEmail(string email);
  public Task<User?> GetByPhoneNumber(string phoneNumber);
  public Task<UserResponse> Create(RegisterDTO dto);
  public Task Remove(int id);
}