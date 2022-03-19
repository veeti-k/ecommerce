﻿namespace api.Utils.Interfaces;

public interface ITokenUtils
{
  public string CreateAccessToken(int userId, Guid sessionId);
  public string CreateRefreshToken(int userId, Guid sessionId);
}