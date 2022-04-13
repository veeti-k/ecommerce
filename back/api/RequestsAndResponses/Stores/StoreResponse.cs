using api.Models;

namespace api.RequestsAndResponses.Stores;

public record StoreResponse
{
  public Guid Id { get; init; }
  public string Name { get; init; }
  public string PhoneNumber { get; init; }
  public string City { get; init; }
  public string StreetAddress { get; init; }
  public string Zip { get; init; }

  public string MondayHours { get; init; }
  public string TuesdayHours { get; init; }
  public string WednesdayHours { get; init; }
  public string ThursdayHours { get; init; }
  public string FridayHours { get; init; }
  public string SaturdayHours { get; init; }
  public string SundayHours { get; init; }

  public List<UpdateHoursExceptionRequest> StoreHoursExceptions { get; init; }
}