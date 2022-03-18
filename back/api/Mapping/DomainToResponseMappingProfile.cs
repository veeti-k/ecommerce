using api.Mapping.MappedTypes;
using api.Models.Product;
using api.Models.User;
using AutoMapper;

namespace api.Mapping;

public class AverageStarsResolver<Destination> : IValueResolver<Product, Destination, int>
{
  public int Resolve(Product source, Destination destination, int member, ResolutionContext context)
  {
    if (!source.Reviews.Any()) return 0;

    return source.Reviews
      .Aggregate(0, (acc, review) => acc + review.Stars) / source.Reviews.Count();
  }
}

public class DomainToResponseMappingProfile : Profile
{
  public DomainToResponseMappingProfile()
  {
    CreateMap<User, UserResponse>();
    CreateMap<Session, SessionResponse>();
    CreateMap<Address, AddressResponse>();

    CreateMap<Product, ShowCaseProductResponse>()
      .ForMember(dest => dest.AverageStars,
        options => options
          .MapFrom<AverageStarsResolver<ShowCaseProductResponse>>())
      .ForMember(dest => dest.ReviewCount,
        options => options
          .MapFrom(src => src.Reviews.Count()))
      .ForMember(dest => dest.ImportantSpecifications,
        options => options
          .MapFrom(src => src
            .Specifications.Select(spec => spec.IsImportant)));

    CreateMap<Product, ProductPageProductResponse>()
      .ForMember(dest => dest.AverageStars,
        options => options
          .MapFrom<AverageStarsResolver<ProductPageProductResponse>>())
      .ForMember(dest => dest.ReviewCount,
        options => options
          .MapFrom(src => src.Reviews.Count()))
      .ForMember(dest => dest.QuestionCount,
        options => options
          .MapFrom(src => src.Questions.Count()));
  }
}