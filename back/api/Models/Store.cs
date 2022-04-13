using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class Store
{
  [Key] public Guid StoreId { get; set; }
  [Required] public string Name { get; set; }
  [Required] public string City { get; set; }
  [Required] public string StreetAddress { get; set; }
  [Required] public string Zip { get; set; }
  [Required] public string PhoneNumber { get; set; }
  [Required] public string MondayHours { get; set; }
  [Required] public string TuesdayHours { get; set; }
  [Required] public string WednesdayHours { get; set; }
  [Required] public string ThursdayHours { get; set; }
  [Required] public string FridayHours { get; set; }
  [Required] public string SaturdayHours { get; set; }
  [Required] public string SundayHours { get; set; }

  public virtual List<StoreHoursException> StoreHoursExceptions { get; set; }
  public virtual List<StoreProduct> StoreStocks { get; set; }
}