using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.StoreHours;

public record UpdateDefaultHoursRequestBody
{
  public string MondayHours { get; set; }
  public string TuesdayHours { get; set; }
  public string WednesdayHours { get; set; }
  public string ThursdayHours { get; set; }
  public string FridayHours { get; set; }
  public string SaturdayHours { get; set; }
  public string SundayHours { get; set; }
}

public class UpdateDefaultHoursRequest
{
  [FromRoute(Name = "storeId")] public Guid StoreId { get; set; }
  [FromBody] public UpdateDefaultHoursRequestBody Body { get; set; }
}

public class UpdateDefaultHoursRequestValidator : AbstractValidator<UpdateDefaultHoursRequest>
{
  public UpdateDefaultHoursRequestValidator()
  {
    RuleFor(x => x.Body).NotNull();
    RuleFor(x => x.Body.MondayHours).NotEmpty();
    RuleFor(x => x.Body.TuesdayHours).NotEmpty();
    RuleFor(x => x.Body.WednesdayHours).NotEmpty();
    RuleFor(x => x.Body.ThursdayHours).NotEmpty();
    RuleFor(x => x.Body.FridayHours).NotEmpty();
    RuleFor(x => x.Body.SaturdayHours).NotEmpty();
    RuleFor(x => x.Body.SundayHours).NotEmpty();
  }
}