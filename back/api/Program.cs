using System.Security.Claims;
using System.Text;
using api.Configs;
using api.Data;
using api.Exceptions;
using api.Repositories.Session;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using api.Repositories.User;
using api.Security.Policies;
using api.Security.Policies.Handlers;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(options =>
  options.UseNpgsql(DbConfig.ConnectionString));

builder.Services.AddScoped<IDataContext, DataContext>();
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<ISessionRepo, SessionRepo>();

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

        ValidIssuer = TokenConfig.AccessIss,
        ValidAudience = TokenConfig.AccessAud,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(TokenConfig.AccessSecret))
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
            context.HttpContext.Request.Cookies.TryGetValue(TokenConfig.RefreshTokenCookie, out var token);
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

        ValidIssuer = TokenConfig.RefreshIss,
        ValidAudience = TokenConfig.RefreshAud,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(TokenConfig.RefreshSecret))
      };
    }
  );

builder.Services.AddAuthorization(options =>
{
  options.DefaultPolicy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .RequireClaim(ClaimTypes.NameIdentifier)
    .RequireClaim(ClaimTypes.Version)
    .AddAuthenticationSchemes("AccessToken")
    .AddRequirements(new ValidSessionRequirement())
    .Build();

  options.AddPolicy("ValidRefreshToken", policy =>
  {
    policy.RequireAuthenticatedUser();
    policy.RequireClaim(ClaimTypes.NameIdentifier);
    policy.RequireClaim(ClaimTypes.Version);
    policy.AddAuthenticationSchemes("RefreshToken");
    policy.AddRequirements(new ValidSessionRequirement());
  });
});

builder.Services.AddScoped<IAuthorizationHandler, ValidSessionHandler>();

var app = builder.Build();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run("http://0.0.0.0:5000");