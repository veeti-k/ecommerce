using api.Exceptions;
using api.Models;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Stores;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Stores;

public class AddStore : EndpointBaseAsync
  .WithRequest<AddStoreRequest>
  .WithActionResult

{
  private readonly IGenericRepo<Models.Store> _storeRepo;
  private readonly IValidator<AddStoreRequest> _validator;

  public AddStore(IGenericRepo<Models.Store> storeRepo, IValidator<AddStoreRequest> validator)
  {
    _storeRepo = storeRepo;
    _validator = validator;
  }

  [Authorize(Policy = Policies.ManageStores)]
  [HttpPost(Routes.StoresRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] AddStoreRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var validationResult = await _validator.ValidateAsync(request, cancellationToken);
    if (!validationResult.IsValid) throw new BadRequestException(validationResult.ToString());

    var newStoreId = Guid.NewGuid();

    var newStore = new Models.Store()
    {
      StoreId = newStoreId,
      Name = request.Name,
      City = request.City,
      Zip = request.Zip,
      StreetAddress = request.StreetAddress
    };

    await _storeRepo.Add(newStore);

    var locationUri = Routes.Stores.StoreRoot
      .Replace(Routes.Stores.StoreId, newStoreId.ToString());

    return Created(locationUri, null);
  }
}