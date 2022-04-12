using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.StoreHours;
using Ardalis.ApiEndpoints;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Stores.Store.Hours.Default;

public class UpdateDefaultHours : EndpointBaseAsync
  .WithRequest<UpdateDefaultHoursRequest>
  .WithActionResult
{
  private readonly IDefaultStoreHoursRepo _defaultStoreHoursRepo;
  private readonly IValidator<UpdateDefaultHoursRequest> _validator;

  public UpdateDefaultHours(IDefaultStoreHoursRepo defaultStoreHoursRepo,
    IValidator<UpdateDefaultHoursRequest> validator)
  {
    _defaultStoreHoursRepo = defaultStoreHoursRepo;
    _validator = validator;
  }

  [HttpPatch(Routes.Stores.Store.Hours.Default)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] UpdateDefaultHoursRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var validationResult = await _validator.ValidateAsync(request, cancellationToken);
    if (!validationResult.IsValid) throw new BadRequestException(validationResult.ToString());

    var existingHours = await _defaultStoreHoursRepo.GetByStoreId(request.StoreId);
    if (existingHours is null) throw new StoreDefaultHoursNotFound(request.StoreId);

    existingHours.MondayHours = request.Body.MondayHours;
    existingHours.TuesdayHours = request.Body.TuesdayHours;
    existingHours.WednesdayHours = request.Body.WednesdayHours;
    existingHours.ThursdayHours = request.Body.ThursdayHours;
    existingHours.FridayHours = request.Body.FridayHours;
    existingHours.SaturdayHours = request.Body.SaturdayHours;
    existingHours.SundayHours = request.Body.SundayHours;

    await _defaultStoreHoursRepo.Update(existingHours);

    return Ok();
  }
}