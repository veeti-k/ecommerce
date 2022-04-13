using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Stores;

public class AddStoreRequestBody
{
  public string Name { get; set; }
  public string City { get; set; }
  public string StreetAddress { get; set; }
  public string Zip { get; set; }
  public string PhoneNumber { get; set; }
  public string MondayHours { get; set; }
  public string TuesdayHours { get; set; }
  public string WednesdayHours { get; set; }
  public string ThursdayHours { get; set; }
  public string FridayHours { get; set; }
  public string SaturdayHours { get; set; }
  public string SundayHours { get; set; }
}

public class AddStoreRequest
{
  [FromBody] public AddStoreRequestBody Body { get; set; }
}

public class AddStoreRequestValidator : AbstractValidator<AddStoreRequest>
{
  public AddStoreRequestValidator()
  {
    RuleFor(x => x.Body.Name).NotEmpty();
    RuleFor(x => x.Body.City).NotEmpty();
    RuleFor(x => x.Body.StreetAddress).NotEmpty();
    RuleFor(x => x.Body.Zip).NotEmpty();
    RuleFor(x => x.Body.MondayHours).NotEmpty();
    RuleFor(x => x.Body.TuesdayHours).NotEmpty();
    RuleFor(x => x.Body.WednesdayHours).NotEmpty();
    RuleFor(x => x.Body.ThursdayHours).NotEmpty();
    RuleFor(x => x.Body.FridayHours).NotEmpty();
    RuleFor(x => x.Body.SaturdayHours).NotEmpty();
    RuleFor(x => x.Body.SundayHours).NotEmpty();
  }
}