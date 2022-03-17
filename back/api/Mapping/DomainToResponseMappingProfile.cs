using api.DTOs;
using api.Models.User;
using AutoMapper;

namespace api.Mapping;

public class DomainToResponseMappingProfile : Profile
{
  public DomainToResponseMappingProfile()
  {
    CreateMap<User, UserResponse>();
    CreateMap<Session, SessionResponse>();
    CreateMap<Address, AddressResponse>();
  }
}