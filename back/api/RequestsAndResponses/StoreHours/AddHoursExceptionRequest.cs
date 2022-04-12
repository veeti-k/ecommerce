using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.StoreHours;

public class AddHoursExceptionRequestBody
{
  public DateTime Date { get; set; }
  public string Reason { get; set; }
  public string Hours { get; set; }
}

public class AddHoursExceptionRequest
{
  [FromRoute(Name = "storeId")] public Guid StoreId { get; set; }
  [FromRoute(Name = "exceptionId")] public Guid ExceptionId { get; set; }
  [FromBody] public AddHoursExceptionRequestBody Body { get; set; }
}

public class AddHoursExceptionRequestValidator : AbstractValidator<AddHoursExceptionRequest>
{
  public AddHoursExceptionRequestValidator()
  {
    RuleFor(x => x.Body).NotNull();
    RuleFor(x => x.Body.Date).NotEmpty();
    RuleFor(x => x.Body.Reason).NotEmpty();
    RuleFor(x => x.Body.Hours).NotEmpty();
  }
}