using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class StoreDefaultHours
{
  [Key] public Guid StoreHoursId { get; set; }
  [Required] public Guid StoreId { get; set; }

  [Required] public string MondayHours { get; set; }
  [Required] public string TuesdayHours { get; set; }
  [Required] public string WednesdayHours { get; set; }
  [Required] public string ThursdayHours { get; set; }
  [Required] public string FridayHours { get; set; }
  [Required] public string SaturdayHours { get; set; }
  [Required] public string SundayHours { get; set; }

  public virtual Store Store { get; set; }
}