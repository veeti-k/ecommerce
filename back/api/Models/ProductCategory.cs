using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class ProductCategory
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int ProductCategoryId { get; set; }
  [Required] public string Name { get; set; }
  public int? ParentId { get; set; }
}