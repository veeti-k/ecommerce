using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class Store
{
  [Key] public Guid StoreId { get; set; }
  [Required] public string Name { get; set; }
  [Required] public string City { get; set; }
  [Required] public string StreetAddress { get; set; }
  [Required] public string Zip { get; set; }

  public virtual List<StoreHours> StoreHours { get; set; }
  public virtual List<StoreHoursException> StoreHoursExceptions { get; set; }
  public virtual List<StoreProduct> StoreStocks { get; set; }
}