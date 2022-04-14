using api.Models;
using api.Models.Question;
using api.Models.Review;
using api.Models.User;
using api.Repositories;
using api.Repositories.Interfaces;

namespace api.Startup;

public static class Repos
{
  public static void AddRepos(WebApplicationBuilder builder)
  {
    builder.Services.AddScoped<IGenericRepo<User>, GenericRepo<User>>();
    builder.Services.AddScoped<IUserRepo, UserRepo>();

    builder.Services.AddScoped<IGenericRepo<Address>, GenericRepo<Address>>();
    builder.Services.AddScoped<IAddressRepo, AddressRepo>();

    builder.Services.AddScoped<IGenericRepo<Session>, GenericRepo<Session>>();
    builder.Services.AddScoped<ISessionRepo, SessionRepo>();

    builder.Services.AddScoped<IGenericRepo<Product>, GenericRepo<Product>>();
    builder.Services.AddScoped<IProductRepo, ProductRepo>();

    builder.Services.AddScoped<IGenericRepo<ProductCategory>, GenericRepo<ProductCategory>>();
    builder.Services.AddScoped<ICategoryRepo, CategoryRepo>();

    builder.Services.AddScoped<IGenericRepo<ProductsCategories>, GenericRepo<ProductsCategories>>();
    builder.Services.AddScoped<IProductsCategoriesRepo, ProductsCategoriesRepo>();

    builder.Services.AddScoped<IGenericRepo<ProductBulletPoint>, GenericRepo<ProductBulletPoint>>();
    builder.Services.AddScoped<IGenericRepo<ProductImageLink>, GenericRepo<ProductImageLink>>();

    builder.Services.AddScoped<IGenericRepo<ProductReview>, GenericRepo<ProductReview>>();
    builder.Services.AddScoped<IProductReviewRepo, ProductReviewRepo>();

    builder.Services.AddScoped<IGenericRepo<ProductReviewComment>, GenericRepo<ProductReviewComment>>();
    builder.Services.AddScoped<IProductReviewCommentRepo, ProductReviewCommentRepo>();

    builder.Services.AddScoped<IGenericRepo<ProductQuestion>, GenericRepo<ProductQuestion>>();
    builder.Services.AddScoped<IProductQuestionRepo, ProductQuestionRepo>();

    builder.Services.AddScoped<IGenericRepo<ProductQuestionAnswer>, GenericRepo<ProductQuestionAnswer>>();
    builder.Services.AddScoped<IProductQuestionAnswerRepo, ProductQuestionAnswerRepo>();

    builder.Services.AddScoped<IGenericRepo<Store>, GenericRepo<Store>>();
    builder.Services.AddScoped<IStoreRepo, StoreRepo>();
  }
}