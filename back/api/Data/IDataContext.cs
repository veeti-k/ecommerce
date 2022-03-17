using api.Models.User;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public interface IDataContext
{
  public DbSet<User> Users { get; set; }
  public DbSet<Session> Sessions { get; set; }

  Task<int> SaveChangesAsync(CancellationToken aCancellationToken = default);
}