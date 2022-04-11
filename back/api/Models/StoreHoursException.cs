using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class StoreHoursException
{
  [Key] public Guid HoursExceptionId { get; set; }
  [Required] public Guid StoreId { get; set; }
  [Required] public DateTimeOffset Date { get; set; }
  [Required] public int OpeningHour { get; set; }
  [Required] public int ClosingHour { get; set; }
}