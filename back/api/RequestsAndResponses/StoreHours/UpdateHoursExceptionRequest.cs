using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses;

public class UpdateHoursExceptionRequestBody
{
  public DateTime Date { get; set; }
  public string Reason { get; set; }
  public string Hours { get; set; }
}

public class UpdateHoursExceptionRequest
{
  [FromRoute(Name = "storeId")] public Guid StoreId { get; set; } 
  [FromRoute(Name = "exceptionId")] public Guid ExceptionId { get; set; }
  [FromBody] public UpdateHoursExceptionRequestBody Body { get; set; }
}

public class UpdateHoursExceptionRequestValidator : AbstractValidator<UpdateHoursExceptionRequest>
{
  public UpdateHoursExceptionRequestValidator()
  {
    RuleFor(x => x.Body).NotNull();
    RuleFor(x => x.Body.Date).NotEmpty();
    RuleFor(x => x.Body.Reason).NotEmpty();
    RuleFor(x => x.Body.Hours).NotEmpty();
  }
}