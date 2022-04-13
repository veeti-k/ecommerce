using api.Repositories.Interfaces;
using api.RequestsAndResponses.Stores;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Stores;

public class GetStores : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<List<StoreResponse>>
{
  private readonly IStoreRepo _storeRepository;
  private readonly IMapper _mapper;

  public GetStores(IStoreRepo storeRepository, IMapper mapper)
  {
    _storeRepository = storeRepository;
    _mapper = mapper;
  }

  [HttpGet(Routes.StoresRoot)]
  public override async Task<ActionResult<List<StoreResponse>>> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var stores = await _storeRepository.GetManyStores();

    return Ok(_mapper.Map<List<StoreResponse>>(stores));
  }
}