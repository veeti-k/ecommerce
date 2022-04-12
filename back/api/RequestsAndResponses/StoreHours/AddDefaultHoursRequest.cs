using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.StoreHours;

public record AddDefaultHoursRequestBody
{
  public string MondayHours { get; set; }
  public string TuesdayHours { get; set; }
  public string WednesdayHours { get; set; }
  public string ThursdayHours { get; set; }
  public string FridayHours { get; set; }
  public string SaturdayHours { get; set; }
  public string SundayHours { get; set; }
}

public class AddDefaultHoursRequest
{
  [FromRoute(Name = "storeId")] public Guid StoreId { get; set; }
  [FromBody] public AddDefaultHoursRequestBody Body { get; set; }
}

public class AddDefaultHoursRequestBodyValidator : AbstractValidator<AddDefaultHoursRequestBody>
{
  public AddDefaultHoursRequestBodyValidator()
  {
    RuleFor(x => x.MondayHours).NotEmpty();
    RuleFor(x => x.TuesdayHours).NotEmpty();
    RuleFor(x => x.WednesdayHours).NotEmpty();
    RuleFor(x => x.ThursdayHours).NotEmpty();
    RuleFor(x => x.FridayHours).NotEmpty();
    RuleFor(x => x.SaturdayHours).NotEmpty();
    RuleFor(x => x.SundayHours).NotEmpty();
  }
}