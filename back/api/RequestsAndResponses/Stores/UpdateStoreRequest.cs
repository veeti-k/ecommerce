using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Stores;

public record UpdateStoreDto
{
  [FromBody] public string? Name { get; set; }
  [FromBody] public string? City { get; set; }
  [FromBody] public string? StreetAddress { get; set; }
  [FromBody] public string? Zip { get; set; }
}

public class UpdateStoreRequest
{
  [FromRoute(Name = "StoreId")] public Guid StoreId { get; set; }
  [FromBody] public UpdateStoreDto Dto { get; set; }
}