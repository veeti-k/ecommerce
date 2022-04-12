using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses;
using Ardalis.ApiEndpoints;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Stores.Store.Hours.Exceptions;

public class UpdateHoursException : EndpointBaseAsync
  .WithRequest<UpdateHoursExceptionRequest>
  .WithActionResult
{
  private readonly IStoreHoursExceptionRepo _storeHoursExceptionRepo;
  private readonly IValidator<UpdateHoursExceptionRequest> _validator;

  public UpdateHoursException(IStoreHoursExceptionRepo storeHoursExceptionRepo,
    IValidator<UpdateHoursExceptionRequest> validator)
  {
    _storeHoursExceptionRepo = storeHoursExceptionRepo;
    _validator = validator;
  }

  [HttpPatch(Routes.Stores.Store.Hours.Exception)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] UpdateHoursExceptionRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var validationResult = await _validator.ValidateAsync(request, cancellationToken);
    if (!validationResult.IsValid) throw new BadRequestException(validationResult.ToString());

    var existingException = await _storeHoursExceptionRepo
      .GetByDate(request.StoreId, request.ExceptionId, request.Body.Date);

    if (existingException is null) throw new StoreHoursExceptionNotFound(request.StoreId, request.ExceptionId);

    existingException.Date = request.Body.Date;
    existingException.Reason = request.Body.Reason;
    existingException.Hours = request.Body.Hours;

    await _storeHoursExceptionRepo.Update(existingException);

    return Ok();
  }
}