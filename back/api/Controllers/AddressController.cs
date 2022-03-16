using api.DTOs;
using api.Services.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Authorize]
[Route("users")]
public class AddressController : BaseController
{
  private readonly IMapper _mapper;
  private readonly IAddressService _addressService;

  public AddressController(IMapper mapper, IAddressService addressService)
  {
    _mapper = mapper;
    _addressService = addressService;
  }

  [HttpGet("me/addresses")]
  public async Task<ActionResult<IEnumerable<AddressResponse>>> GetAllAddressesMe()
  {
    var userId = GetUserId().GetValueOrDefault();

    var addresses = await _addressService
      .GetMany(userId);

    return Ok(_mapper.Map<IEnumerable<AddressResponse>>(addresses));
  }

  [HttpGet("me/addresses/{addressId:Guid}")]
  public async Task<ActionResult<AddressResponse>> GetOneAddressMe(Guid addressId)
  {
    var userId = GetUserId().GetValueOrDefault();

    var address = await _addressService.GetOne(addressId, userId);

    return Ok(_mapper.Map<AddressResponse>(address));
  }

  [HttpPost("me/addresses")]
  public async Task<ActionResult> AddAddressMe(CreateAddressDTO dto)
  {
    var userId = GetUserId();

    var created = await _addressService.Create(dto, userId.GetValueOrDefault());

    return Created(String.Empty, _mapper.Map<AddressResponse>(created));
  }

  [HttpPatch("me/addresses/{addressId:Guid}")]
  public async Task<ActionResult<AddressResponse>> UpdateAddressMe(UpdateAddressDTO dto, Guid addressId)
  {
    var userId = GetUserId().GetValueOrDefault();

    var updated = await _addressService.Update(dto, userId, addressId);

    return Ok(_mapper.Map<AddressResponse>(updated));
  }

  [HttpGet("{userId:Guid}/addresses")]
  public async Task<ActionResult<AddressResponse>> GetAllAddresses(Guid userId)
  {
    var addresses = await _addressService.GetMany(userId);

    return Ok(_mapper.Map<IEnumerable<AddressResponse>>(addresses));
  }

  [HttpGet("{userId:Guid}/addresses/{addressId:Guid}")]
  public async Task<ActionResult<AddressResponse>> GetOneAddress(Guid userId, Guid addressId)
  {
    var address = await _addressService
      .GetOne(addressId, userId);

    return Ok(_mapper.Map<AddressResponse>(address));
  }

  [HttpPost("{userId:Guid}/addresses")]
  public async Task<ActionResult<AddressResponse>> AddAddress(CreateAddressDTO dto, Guid userId)
  {
    var created = await _addressService.Create(dto, userId);

    return Created(String.Empty, _mapper.Map<AddressResponse>(created));
  }

  [HttpPatch("{userId:Guid}/addresses/{addressId:Guid}")]
  public async Task<ActionResult<AddressResponse>> UpdateAddress(UpdateAddressDTO dto, Guid userId, Guid addressId)
  {
    var updated = await _addressService.Update(dto, userId, addressId);

    return Ok(_mapper.Map<AddressResponse>(updated));
  }
}