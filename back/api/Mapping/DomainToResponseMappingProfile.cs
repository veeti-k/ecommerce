using api.DTOs;
using api.Models;
using AutoMapper;

namespace api.Mapping;

public class DomainToResponseMappingProfile : Profile
{
  public DomainToResponseMappingProfile()
  {
    CreateMap<User, UserResponse>();
  }
}