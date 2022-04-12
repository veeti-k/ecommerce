using api.Exceptions;
using api.Models;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.StoreHours;
using Ardalis.ApiEndpoints;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Stores.Store.Hours.Exceptions;

public class AddHoursException : EndpointBaseAsync
  .WithRequest<AddHoursExceptionRequest>
  .WithActionResult

{
  private readonly IStoreHoursExceptionRepo _storeHoursExceptionRepo;
  private readonly IValidator<AddHoursExceptionRequest> _validator;

  public AddHoursException(IStoreHoursExceptionRepo storeHoursExceptionRepo)
  {
    _storeHoursExceptionRepo = storeHoursExceptionRepo;
  }

  [HttpPost(Routes.Stores.Store.Hours.ExceptionsRoot)]
  public override async Task<ActionResult> HandleAsync(AddHoursExceptionRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var existingException = await _storeHoursExceptionRepo
      .GetByDate(request.StoreId, request.ExceptionId, request.Body.Date);
    
    if (existingException is not null) throw new BadRequestException("Exception already exists for this date");

    var newException = new StoreHoursException
    {
      StoreId = request.StoreId,
      Date = request.Body.Date,
      Reason = request.Body.Reason
    };

    await _storeHoursExceptionRepo.Add(newException);

    return Ok();
  }
}