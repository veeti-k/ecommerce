using api.DTOs.Auth;
using api.Mapping.MappedTypes;
using api.Models.User;

namespace api.Services.Interfaces;

public interface IUserService
{
  public Task<UserResponse> GetById(int id);
  public Task<UserResponse?> GetByEmail(string email);
  public Task Remove(int id);
}