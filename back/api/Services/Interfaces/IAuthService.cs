using api.DTOs.Auth;

namespace api.Services.Interfaces;

public interface IAuthService
{
  public Task<string> Login(LoginDTO dto);
  public Task Logout();
  public Task<string> Register(RegisterDTO dto);
  public void RefreshTokens();
}