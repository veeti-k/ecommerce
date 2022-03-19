using api.DTOs.Auth;

namespace api.Services.Interfaces;

public interface IAuthService
{
  public Task Login(LoginDTO dto);
  public Task Logout();
  public Task Register(RegisterDTO dto);
  public void RefreshTokens();
}