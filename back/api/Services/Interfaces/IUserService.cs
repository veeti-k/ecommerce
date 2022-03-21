using api.DTOs;
using api.Mapping.MappedTypes;

namespace api.Services.Interfaces;

public interface IUserService
{
  public Task<UserResponse> GetById(int id);
  public Task<UserResponse> UpdateFlags(UpdateUserFlagsDTO dto, int userId);
  public Task<UserResponse> Update(UpdateUserDTO aFlagsDto, int userId);
  public Task Remove(int id);
}