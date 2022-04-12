using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class StoreHoursException
{
  [Key] public Guid StoreHoursExceptionId { get; set; }
  [Required] public Guid StoreId { get; set; }
  [Required] public DateTime Date { get; set; }
  [Required] public string Reason { get; set; }
  [Required] public string Hours { get; set; }
}