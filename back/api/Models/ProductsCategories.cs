using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class ProductsCategories
{
  [Required] public int ProductId { get; set; }
  [Required] public int ProductCategoryId { get; set; }
  
  public virtual ProductCategory Category { get; set; }
}