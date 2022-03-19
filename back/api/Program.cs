using System.Text;
using api.Configs;
using api.Data;
using api.Exceptions;
using api.Repositories;
using api.Repositories.Interfaces;
using api.Security;
using api.Security.Policies.Handlers;
using api.Security.Policies.Requirements;
using api.Services;
using api.Services.Interfaces;
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

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ISessionService, SessionService>();
builder.Services.AddScoped<IAddressService, AddressService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IContextService, ContextService>();

builder.Services.AddSingleton<ICookieUtils, CookieUtils>();
builder.Services.AddSingleton<ITokenUtils, TokenUtils>();
builder.Services.AddScoped<IAuthUtils, AuthUtils>();

builder.Services.AddScoped<IAuthorizationHandler, ValidSessionHandler>();
builder.Services.AddScoped<IAuthorizationHandler, FlagHandler>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.Configure<TokenOptions>(
  builder.Configuration.GetSection(TokenOptions.Position));

builder.Services.AddRouting(options => options.LowercaseUrls = true);

builder.Services.AddAuthentication(options => options.DefaultScheme = CrucialStrings.AccessToken)
  .AddJwtBearer(CrucialStrings.AccessToken, options =>
  {
    options.TokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateLifetime = true,
      ValidateIssuerSigningKey = true,

      RequireAudience = true,
      RequireSignedTokens = true,
      RequireExpirationTime = true,
      ClockSkew = TimeSpan.Zero,

      ValidIssuer = builder.Configuration[$"{TokenOptions.Position}:AccessIss"],
      ValidAudience = builder.Configuration[$"{TokenOptions.Position}:AccessAud"],
      ValidAlgorithms = new List<string>() {SecurityAlgorithms.HmacSha256Signature},
      IssuerSigningKey =
        new SymmetricSecurityKey(
          Encoding.Default.GetBytes(builder.Configuration[$"{TokenOptions.Position}:AccessSecret"]))
    };
  })
  .AddJwtBearer(CrucialStrings.RefreshToken, options =>
  {
    options.Events = new JwtBearerEvents
    {
      OnMessageReceived = context =>
      {
        var goodCookie =
          context.HttpContext.Request.Cookies.TryGetValue(
            builder.Configuration[$"{TokenOptions.Position}:RefreshTokenCookieName"], out var token);

        if (goodCookie) context.Token = token;

        return Task.CompletedTask;
      }
    };
    options.TokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateLifetime = true,
      ValidateIssuerSigningKey = true,

      RequireAudience = true,
      RequireSignedTokens = true,
      RequireExpirationTime = true,
      ClockSkew = TimeSpan.Zero,

      ValidIssuer = builder.Configuration[$"{TokenOptions.Position}:RefreshIss"],
      ValidAudience = builder.Configuration[$"{TokenOptions.Position}:RefreshAud"],
      IssuerSigningKey =
        new SymmetricSecurityKey(
          Encoding.Default.GetBytes(builder.Configuration[$"{TokenOptions.Position}:RefreshSecret"]))
    };
  });

builder.Services.AddAuthorization(options =>
{
  options.DefaultPolicy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .AddAuthenticationSchemes(CrucialStrings.AccessToken)
    .AddRequirements(new ValidSessionRequirement())
    .Build();

  options.AddPolicy(CrucialStrings.ValidRefreshToken, policy =>
  {
    policy.RequireAuthenticatedUser();
    policy.AddAuthenticationSchemes(CrucialStrings.RefreshToken);
    policy.AddRequirements(new ValidSessionRequirement());
  });
  
  options.AddPolicy(CrucialStrings.ManageProducts, policy =>
  {
    policy.RequireAuthenticatedUser();
    policy.AddRequirements(new FlagRequirement(Flags.MANAGE_PRODUCTS));
  });
});

var app = builder.Build();

app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run("http://0.0.0.0:5000");