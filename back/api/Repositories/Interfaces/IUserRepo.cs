﻿using System.Linq.Expressions;
using api.Models.User;

namespace api.Repositories.Interfaces;

public interface IUserRepo
{
  public Task<User?> GetById(int userId);
  public Task<User?> GetByEmail(string email);
  public Task<User?> GetByPhoneNumber(string phoneNumber);
  public Task<User> Add(User user, bool saveNow = true);
  public Task Remove(User user);
}