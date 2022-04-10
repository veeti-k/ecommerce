using api.Models;

namespace api.Utils;

public static class SearchUtils
{
  public static List<Product> OrderByNameStartsWith(List<Product> products, string query)
  {
    return products.OrderBy(p => p.Name.IndexOf(query, StringComparison.OrdinalIgnoreCase) != 0).ToList();
  }
}