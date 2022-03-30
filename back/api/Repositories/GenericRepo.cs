using api.Data;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class GenericRepo<T> : IGenericRepo<T> where T : class
{
  private readonly DataContext _context;
  private readonly DbSet<T> _dbSet;

  public GenericRepo(DataContext context)
  {
    _context = context;
    _dbSet = _context.Set<T>();
  }

  public async Task<T?> GetById(int id) => await _dbSet.FindAsync(id);

  public async Task<T?> GetById(Guid id) => await _dbSet.FindAsync(id);

  public async Task<T> Add(T entity)
  {
    var added = _dbSet.Add(entity);
    await _context.SaveChangesAsync();

    return added.Entity;
  }

  public async Task<T> Update(T entity)
  {
    var updated = _dbSet.Update(entity);
    await _context.SaveChangesAsync();

    return updated.Entity;
  }

  public async Task Delete(T entity)
  {
    _dbSet.Remove(entity);
    await _context.SaveChangesAsync();
  }

  public async Task DeleteMany(IEnumerable<T> entities)
  {
    foreach (var entity in entities)
    {
      _dbSet.Remove(entity);
    }

    await _context.SaveChangesAsync();
  }
}