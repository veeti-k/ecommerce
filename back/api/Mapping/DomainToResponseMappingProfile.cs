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
using api.RequestsAndResponses.User;
using AutoMapper;

namespace api.Mapping;

public class ProductPathResolver<TDest> : IValueResolver<Product, TDest, List<ProductCategory>>
{
  public List<ProductCategory> Resolve(Product source, TDest destination,
    List<ProductCategory> destMember, ResolutionContext context)
  {
    var resolvedPath = new List<ProductCategory>();

    foreach (var pc in source.ProductsCategories)
    {
      resolvedPath.Add(pc.Category);

      if (pc.Category.ParentId == null) continue;
    }

    return resolvedPath;
  }
}

public class DomainToResponseMappingProfile : Profile
{
  public DomainToResponseMappingProfile()
  {
    CreateMap<User, UserResponse>();
    CreateMap<Session, SessionResponse>();
    CreateMap<Address, AddressResponse>();

    CreateMap<Product, BaseProductResponse>();
    CreateMap<Product, ProductPageProductResponse>()
      .ForMember(dest => dest.Path,
        options => options
          .MapFrom<ProductPathResolver<ProductPageProductResponse>>());

    CreateMap<ProductReview, ProductReviewResponse>();
    CreateMap<ProductReviewComment, ProductReviewCommentResponse>();
    CreateMap<ProductQuestion, ProductQuestionResponse>();
    CreateMap<ProductQuestionAnswer, ProductQuestionAnswerResponse>();

    CreateMap<ProductCategory, ResolvedCategory>();
    CreateMap<ProductBulletPoint, ProductBulletPointResponse>()
      .ForMember(dest => dest.Id,
        options => options
          .MapFrom(src => src.ProductBulletPointId));

    CreateMap<ProductImageLink, ProductImageResponse>()
      .ForMember(dest => dest.Id,
        options => options
          .MapFrom(src => src.ProductImageLinkId));
  }
}