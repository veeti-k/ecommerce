using api.Mapping.MappedTypes;
using api.Mapping.MappedTypes.Product;
using api.Models.Product;
using api.Models.Product.Question;
using api.Models.Product.Review;
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

    CreateMap<Product, ProductCreatedResponse>();
    CreateMap<Product, ProductUpdatedResponse>();
    CreateMap<Product, ShowCaseProductResponse>()
      .ForMember(dest => dest.ImportantSpecifications,
        options => options
          .MapFrom(src => src
            .Specifications.Select(spec => spec.IsImportant)));
    CreateMap<Product, ProductPageProductResponse>()
      .ForMember(dest => dest.QuestionCount,
        options => options
          .MapFrom(src => src.Questions.Count()));

    CreateMap<ProductReview, ProductReviewResponse>();
    CreateMap<ProductReviewComment, ProductReviewCommentResponse>();
    CreateMap<ProductQuestion, ProductQuestionResponse>();
    CreateMap<ProductQuestionAnswer, ProductQuestionAnswerResponse>();
  }
}