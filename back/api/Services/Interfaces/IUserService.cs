using api.DTOs.Auth;
using api.Mapping.MappedTypes;
using api.Models.User;

namespace api.Services.Interfaces;

public interface IUserService
{
  public Task<UserResponse> GetById(int id, bool required = true);
  public Task<User?> GetByEmail(string email);
  public Task<UserResponse> Create(RegisterDTO dto);
  public Task Remove(int id);
}