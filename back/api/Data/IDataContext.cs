using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public interface IDataContext
{
  public DbSet<User> Users { get; set; }
  
  Task<int> SaveChangesAsync(CancellationToken aCancellationToken = default);
}