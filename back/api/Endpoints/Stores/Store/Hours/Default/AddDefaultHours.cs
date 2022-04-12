using api.Exceptions;
using api.Models;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.StoreHours;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Stores.Store.Hours.Default;

public class AddDefaultHours : EndpointBaseAsync
  .WithRequest<AddDefaultHoursRequest>
  .WithActionResult
{
  private readonly IDefaultStoreHoursRepo _defaultStoreHoursRepo;
  private readonly IValidator<AddDefaultHoursRequest> _validator;

  public AddDefaultHours(IDefaultStoreHoursRepo defaultStoreHoursRepo, IValidator<AddDefaultHoursRequest> validator)
  {
    _defaultStoreHoursRepo = defaultStoreHoursRepo;
    _validator = validator;
  }

  [Authorize(Policy = Policies.ManageStoreHours)]
  [HttpPost(Routes.Stores.Store.Hours.Default)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] AddDefaultHoursRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var existingHours = await _defaultStoreHoursRepo.GetByStoreId(request.StoreId);
    if (existingHours is null) throw new BadRequestException("Default hours already exist for this store");

    var validationResult = await _validator.ValidateAsync(request, cancellationToken);
    if (!validationResult.IsValid) throw new BadRequestException(validationResult.ToString());

    StoreDefaultHours newStoreDefaultHours = new()
    {
      StoreHoursId = Guid.NewGuid(),
      StoreId = request.StoreId,
      MondayHours = request.Body.MondayHours,
      TuesdayHours = request.Body.TuesdayHours,
      WednesdayHours = request.Body.WednesdayHours,
      ThursdayHours = request.Body.ThursdayHours,
      FridayHours = request.Body.FridayHours,
      SaturdayHours = request.Body.SaturdayHours,
      SundayHours = request.Body.SundayHours,
    };

    await _defaultStoreHoursRepo.Add(newStoreDefaultHours);

    return Ok();
  }
}