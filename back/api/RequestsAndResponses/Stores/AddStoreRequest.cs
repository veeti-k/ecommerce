using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Stores;

public class AddStoreRequest
{
  [FromBody] public string Name { get; set; }
  [FromBody] public string City { get; set; }
  [FromBody] public string StreetAddress { get; set; }
  [FromBody] public string Zip { get; set; }
}

public class AddStoreRequestValidator : AbstractValidator<AddStoreRequest>
{
  public AddStoreRequestValidator()
  {
    RuleFor(x => x.Name).NotEmpty();
    RuleFor(x => x.City).NotEmpty();
    RuleFor(x => x.StreetAddress).NotEmpty();
    RuleFor(x => x.Zip).NotEmpty();
  }
}