using api.Models;
using api.Models.Question;
using api.Models.Review;
using api.Models.User;
using api.RequestsAndResponses.Addresses;
using api.RequestsAndResponses.Category;
using api.RequestsAndResponses.Product;
using api.RequestsAndResponses.ProductQuestion;
using api.RequestsAndResponses.ProductQuestionAnswer;
using api.RequestsAndResponses.ProductReview;
using api.RequestsAndResponses.ProductReviewComment;
using api.RequestsAndResponses.Sessions;
using api.RequestsAndResponses.Stores;
using api.RequestsAndResponses.User;
using api.Utils;
using AutoMapper;

namespace api.Mapping;

public class ProductPathResolver<TDest> : IValueResolver<Product, TDest, List<CategoryResponse>>
{
  public List<CategoryResponse> Resolve(Product source, TDest destination,
    List<CategoryResponse> destMember, ResolutionContext context)
  {
    return Categories.GetCategoryPath(source.ProductsCategories, source.DeepestCategoryId).Select(x =>
      new CategoryResponse()
      {
        Id = x.ProductCategoryId,
        Name = x.Name,
        ParentId = x.ParentId
      }).ToList();
  }
}

public class DomainToResponseMappingProfile : Profile
{
  public DomainToResponseMappingProfile()
  {
    CreateMap<User, UserResponse>().ForMember(dest => dest.Id,
      options => options
        .MapFrom(src => src.UserId));

    CreateMap<Session, SessionResponse>().ForMember(dest => dest.Id,
      options => options
        .MapFrom(src => src.SessionId));

    CreateMap<Address, AddressResponse>().ForMember(dest => dest.Id,
      options => options
        .MapFrom(src => src.AddressId));

    CreateMap<Product, ProductResponse>()
      .ForMember(dest => dest.Id,
        options => options
          .MapFrom(src => src.ProductId));

    CreateMap<Product, BaseProductResponse>().ForMember(dest => dest.Id,
      options => options
        .MapFrom(src => src.ProductId));

    CreateMap<Product, ProductPageProductResponse>()
      .ForMember(dest => dest.Path,
        options => options
          .MapFrom<ProductPathResolver<ProductPageProductResponse>>())
      .ForMember(dest => dest.Id,
        options => options
          .MapFrom(src => src.ProductId));

    CreateMap<ProductReview, ProductReviewResponse>()
      .ForMember(dest => dest.Id,
        options => options
          .MapFrom(src => src.ProductReviewId));

    CreateMap<ProductReview, NotApprovedProductReviewResponse>()
      .ForMember(dest => dest.Id,
        options => options
          .MapFrom(src => src.ProductReviewId));

    CreateMap<ProductReviewComment, ProductReviewCommentResponse>()
      .ForMember(dest => dest.Id,
        options => options
          .MapFrom(src => src.ProductReviewCommentId));

    CreateMap<ProductQuestion, ProductQuestionResponse>()
      .ForMember(dest => dest.Id,
        options => options
          .MapFrom(src => src.ProductQuestionId));

    CreateMap<ProductQuestionAnswer, ProductQuestionAnswerResponse>()
      .ForMember(dest => dest.Id,
        options => options
          .MapFrom(src => src.ProductQuestionAnswerId));

    CreateMap<ProductCategory, ResolvedCategory>().ForMember(dest => dest.Id,
      options => options
        .MapFrom(src => src.ProductCategoryId));

    CreateMap<ProductCategory, CategoryResponse>().ForMember(dest => dest.Id,
      options => options
        .MapFrom(src => src.ProductCategoryId));

    CreateMap<ProductBulletPoint, ProductBulletPointResponse>()
      .ForMember(dest => dest.Id,
        options => options
          .MapFrom(src => src.ProductBulletPointId));

    CreateMap<ProductImageLink, ProductImageResponse>()
      .ForMember(dest => dest.Id,
        options => options
          .MapFrom(src => src.ProductImageLinkId));

    CreateMap<Store, StoreResponse>()
      .ForMember(dest => dest.Id,
        options => options
          .MapFrom(src => src.StoreId));
  }
}