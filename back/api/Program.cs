using System.Security.Claims;
using System.Text;
using api.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using api.Configs;
using api.Repositories.User;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(options =>
  options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IDataContext, DataContext>();
builder.Services.AddScoped<IRepo, Repo>();

builder.Services.AddRouting(options => options.LowercaseUrls = true);

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

      ValidIssuer = builder.Configuration.GetSection("JWT_Config").GetValue<string>("AccessIss"),
      ValidAudience = builder.Configuration.GetSection("JWT_Config").GetValue<string>("AccessAud"),
      IssuerSigningKey = new SymmetricSecurityKey(
        Encoding.Default.GetBytes(builder.Configuration.GetSection("JWT_Config").GetValue<string>("AccessSecret"))
      )
    };
  })
  .AddJwtBearer("RefreshToken", options =>
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

      ValidIssuer = builder.Configuration.GetSection("JWT_Config").GetValue<string>("RefreshIss"),
      ValidAudience = builder.Configuration.GetSection("JWT_Config").GetValue<string>("RefreshAud"),
      IssuerSigningKey = new SymmetricSecurityKey(
        Encoding.Default.GetBytes(builder.Configuration.GetSection("JWT_Config").GetValue<string>("RefreshSecret"))
      )
    };
  });

builder.Services.AddAuthorization(options =>
{
  options.DefaultPolicy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .RequireClaim(ClaimTypes.NameIdentifier)
    .RequireClaim(ClaimTypes.Version)
    .AddAuthenticationSchemes("AccessToken").Build();

  options.AddPolicy("ValidRefreshToken", new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .AddAuthenticationSchemes("RefreshToken")
    .RequireClaim(ClaimTypes.NameIdentifier)
    .RequireClaim(ClaimTypes.Version)
    .Build());
});

builder.Services.Configure<JwtConfig>(builder.Configuration.GetSection("JWT_Config"));

var app = builder.Build();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run("http://0.0.0.0:5000");