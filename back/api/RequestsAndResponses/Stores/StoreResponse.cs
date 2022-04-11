using api.Models;

namespace api.RequestsAndResponses.Stores;

public record StoreResponse
{
  public Guid StoreId { get; init; }
  public string Name { get; init; }
  public string City { get; init; }
  public string StreetAddress { get; init; }
  public string Zip { get; init; }
  public List<StoreHours> StoreHours { get; init; }
  public List<StoreHoursException> StoreHoursExceptions { get; init; }
}