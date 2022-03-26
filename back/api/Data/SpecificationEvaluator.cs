namespace api.Data;

public static class QuerySpecificationExtensions
{
  public static IQueryable<T> Spec<T>(this IQueryable<T> query, ISpecification<T> spec) where T : class
  {
    var withIncludes = spec.Includes
      .Aggregate(query, (current, include) => include(current));

    return withIncludes.Where(spec.Criteria);
  }
}