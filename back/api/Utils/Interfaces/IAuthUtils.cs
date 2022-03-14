namespace api.Utils.Interfaces;

public interface IAuthUtils
{
  public void SendTokens(string aAccessToken, string aRefreshToken);
  public void SendLogout();
}