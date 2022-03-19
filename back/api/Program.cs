using System.Text;
using api.Configs;
using api.Data;
using api.Exceptions;
using api.Repositories;
using api.Repositories.Interfaces;
using api.Security;
using api.Security.Policies;
using api.Security.Policies.Handlers;
using api.Security.Policies.Requirements;
using api.Services;
using api.Services.Interfaces;
using api.Startup;
using api.Utils;
using api.Utils.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(options =>
  options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IDataContext, DataContext>();
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<ISessionRepo, SessionRepo>();
builder.Services.AddScoped<IAddressRepo, AddressRepo>();
builder.Services.AddScoped<IProductRepo, ProductRepo>();
builder.Services.AddScoped<IReviewRepo, ReviewRepo>();
builder.Services.AddScoped<IProductReviewCommentRepo, ProductReviewCommentRepo>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ISessionService, SessionService>();
builder.Services.AddScoped<IAddressService, AddressService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IContextService, ContextService>();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddSingleton<ICookieUtils, CookieUtils>();
builder.Services.AddSingleton<ITokenUtils, TokenUtils>();
builder.Services.AddScoped<IAuthUtils, AuthUtils>();

builder.Services.AddScoped<IAuthorizationHandler, ValidSessionHandler>();
builder.Services.AddScoped<IAuthorizationHandler, FlagHandler>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

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
app.Run("http://0.0.0.0:5000");