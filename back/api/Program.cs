using api.Configs;
using api.Data;
using api.Exceptions;
using api.Models.Product;
using api.Models.Product.Question;
using api.Models.Product.Review;
using api.Models.User;
using api.Repositories;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product.Add;
using api.RequestsAndResponses.Product.Update;
using api.Security.Policies.Handlers;
using api.Services;
using api.Services.Interfaces;
using api.Startup;
using api.Utils;
using api.Utils.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(options =>
  options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IDataContext, DataContext>();

builder.Services.AddScoped<IContextService, ContextService>();

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

builder.Services.AddSingleton<ICookieUtils, CookieUtils>();
builder.Services.AddSingleton<ITokenUtils, TokenUtils>();
builder.Services.AddScoped<IAuthUtils, AuthUtils>();

builder.Services.AddScoped<IAuthorizationHandler, ValidSessionAndUserHandler>();
builder.Services.AddScoped<IAuthorizationHandler, FlagHandler>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IValidator<AddProductDto>, AddProductDtoValidator>();
builder.Services.AddScoped<IValidator<UpdateProductDto>, UpdateProductDtoValidator>();

builder.Services.Configure<TokenOptions>(
  builder.Configuration.GetSection(TokenOptions.Position));

builder.Services.AddRouting(options => options.LowercaseUrls = true);

Security.AddAuthentication(builder);
Security.AddAuthorization(builder);

var app = builder.Build();

app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

namespace api
{
  public class Program
  {
  }
}