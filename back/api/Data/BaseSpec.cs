using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query;

namespace api.Data;

public interface ISpecification<T> 
{
  Expression<Func<T, bool>> Criteria { get; }
  List<Func<IQueryable<T>, IIncludableQueryable<T, object>>> Includes { get; }
}

public class BaseSpec<T> : ISpecification<T> where T: class
{
  public Expression<Func<T, bool>> Criteria { get; set; }
  public List<Func<IQueryable<T>, IIncludableQueryable<T, object>>> Includes { get; } = new();
  public List<Expression<Func<IQueryable<T>, object>>> Includes2 { get; set; } = new();

  protected virtual void Include(Expression<Func<IQueryable<T>, IIncludableQueryable<T, object>>> expression)
  {
    Includes.Add(expression.Compile());
  }
  
  protected virtual void Include(Expression<Func<IQueryable<T>, object>> expression)
  {
    Includes2.Add(expression);
  }
}