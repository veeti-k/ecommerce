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

    CreateMap<Product, ProductResponse>();
    CreateMap<Product, ShowCaseProductResponse>()
      .ForMember(dest => dest.ImportantBulletpoints,
        options => options
          .MapFrom(src => src
            .BulletPoints.Where(point => point.IsImportant)));

    CreateMap<ProductReview, ProductReviewResponse>();
    CreateMap<ProductReviewComment, ProductReviewCommentResponse>();
    CreateMap<ProductQuestion, ProductQuestionResponse>()
      // alternative method of getting only the approved answers, 
      // but this way the database wouldn't do the filtering, the server would
      /*.ForMember(dest => dest.Answers,
        options => options
          .MapFrom(src => src.Answers.Where(answer => answer.IsApproved)))*/;
    CreateMap<ProductQuestionAnswer, ProductQuestionAnswerResponse>();
    CreateMap<ProductBulletPoint, ProductBulletPointResponse>();
  }
}