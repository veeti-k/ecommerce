using api.Models.Product;
using api.Models.Product.Question;
using api.Models.Product.Review;
using api.Models.User;
using api.RequestsAndResponses.Addresses;
using api.RequestsAndResponses.Category;
using api.RequestsAndResponses.Product;
using api.RequestsAndResponses.ProductQuestion;
using api.RequestsAndResponses.ProductQuestionAnswer;
using api.RequestsAndResponses.ProductReview;
using api.RequestsAndResponses.ProductReviewComment;
using api.RequestsAndResponses.Sessions;
using api.RequestsAndResponses.User;
using AutoMapper;

namespace api.Mapping;

public class DomainToResponseMappingProfile : Profile
{
  public DomainToResponseMappingProfile()
  {
    CreateMap<User, UserResponse>();
    CreateMap<Session, SessionResponse>();
    CreateMap<Address, AddressResponse>();

    CreateMap<Product, BaseProductResponse>();
    CreateMap<Product, ProductPageProductResponse>();
    CreateMap<ProductReview, ProductReviewResponse>();
    CreateMap<ProductReviewComment, ProductReviewCommentResponse>();
    CreateMap<ProductQuestion, ProductQuestionResponse>();
    CreateMap<ProductQuestionAnswer, ProductQuestionAnswerResponse>();

    CreateMap<ProductCategory, ProductCategoryResponse>();
    CreateMap<ProductBulletPoint, ProductBulletPointResponse>();
  }
}