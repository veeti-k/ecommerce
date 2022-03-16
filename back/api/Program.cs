using System.Security.Claims;
using System.Text;
using api.Configs;
using api.Data;
using api.Exceptions;
using api.Repositories;
using api.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using api.Security.Policies;
using api.Security.Policies.Handlers;
using api.Security.Policies.Requirements;
using api.Services;
using api.Services.Interfaces;
using api.Utils;
using api.Utils.Interfaces;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(options =>
  options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IDataContext, DataContext>();
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<ISessionRepo, SessionRepo>();
builder.Services.AddScoped<IAddressRepo, AddressRepo>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ISessionService, SessionService>();
builder.Services.AddScoped<IAddressService, AddressService>();

builder.Services.AddSingleton<ICookieUtils, CookieUtils>();
builder.Services.AddSingleton<ITokenUtils, TokenUtils>();
builder.Services.AddScoped<IAuthUtils, AuthUtils>();

builder.Services.AddScoped<IAuthorizationHandler, ValidSessionHandler>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.Configure<TokenOptions>(
  builder.Configuration.GetSection(TokenOptions.Position));

builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddMvc(options => options.Filters.Add(new ExceptionHandler()));

builder.Services.AddAuthentication(options =>
  {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
  })
  .AddJwtBearer("AccessToken", options =>
    {
      options.TokenValidationParameters = new TokenValidationParameters()
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
        IssuerSigningKey =
          new SymmetricSecurityKey(
            Encoding.Default.GetBytes(builder.Configuration[$"{TokenOptions.Position}:AccessSecret"]))
      };
    }
  )
  .AddJwtBearer("RefreshToken", options =>
    {
      options.Events = new JwtBearerEvents()
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
      options.TokenValidationParameters = new TokenValidationParameters()
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
    }
  );

builder.Services.AddAuthorization(options =>
{
  options.DefaultPolicy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .AddAuthenticationSchemes("AccessToken")
    .RequireClaim(ClaimTypes.NameIdentifier)
    .RequireClaim(ClaimTypes.Version)
    .AddRequirements(new ValidSessionRequirement())
    .AddRequirements(new ValidUserIdRequirement())
    .Build();

  options.AddPolicy("ValidRefreshToken", policy =>
  {
    policy.RequireAuthenticatedUser();
    policy.AddAuthenticationSchemes("RefreshToken");
    policy.RequireClaim(ClaimTypes.NameIdentifier);
    policy.RequireClaim(ClaimTypes.Version);
    policy.AddRequirements(new ValidSessionRequirement());
    policy.AddRequirements(new ValidUserIdRequirement());
  });
});

var app = builder.Build();

app.UsePathBase("/api");
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run("http://0.0.0.0:5000");