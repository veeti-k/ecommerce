using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class StoreHours
{
  [Key] public Guid HoursId { get; set; }
  [Required] public Guid StoreId { get; set; }
  [Required] public int Week { get; set; }
  [Required] public int Year { get; set; }
  [Required] public int WeekdayOpeningHour { get; set; }
  [Required] public int WeekdayClosingHour { get; set; }
  [Required] public int SaturdayOpeningHour { get; set; }
  [Required] public int SaturdayClosingHour { get; set; }
  [Required] public int SundayOpeningHour { get; set; }
  [Required] public int SundayClosingHour { get; set; }
}