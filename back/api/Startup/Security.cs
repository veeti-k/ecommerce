using System.Text;
using api.Configs;
using api.Security;
using api.Security.Policies;
using api.Security.Policies.Requirements;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace api.Startup;

public static class Security
{
  public static void AddAuthentication(WebApplicationBuilder builder)
  {
    builder.Services.AddAuthentication(options => options.DefaultScheme = AuthenticationSchemes.AccessToken)
      .AddJwtBearer(AuthenticationSchemes.AccessToken, options =>
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
          ValidAlgorithms = new List<string> {SecurityAlgorithms.HmacSha256Signature},
          IssuerSigningKey =
            new SymmetricSecurityKey(
              Encoding.Default.GetBytes(builder.Configuration[$"{TokenOptions.Position}:AccessSecret"]))
        };
      })
      .AddJwtBearer(AuthenticationSchemes.RefreshToken, options =>
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
  }

  public static void AddAuthorization(WebApplicationBuilder builder)
  {
    builder.Services.AddAuthorization(options =>
    {
      options.DefaultPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .AddAuthenticationSchemes(AuthenticationSchemes.AccessToken)
        .AddRequirements(new ValidSessionAndUserRequirement())
        .Build();

      options.AddPolicy(Policies.ValidRefreshToken, policy =>
      {
        policy.RequireAuthenticatedUser();
        policy.AddAuthenticationSchemes(AuthenticationSchemes.RefreshToken);
        policy.AddRequirements(new ValidSessionAndUserRequirement());
      });

      options.AddPolicy(Policies.ManageProducts, policy =>
      {
        policy.RequireAuthenticatedUser();
        policy.AddRequirements(new FlagRequirement(Flags.MANAGE_PRODUCTS));
      });

      options.AddPolicy(Policies.ManageReviews, policy =>
      {
        policy.RequireAuthenticatedUser();
        policy.AddRequirements(new FlagRequirement(Flags.MANAGE_REVIEWS));
      });

      options.AddPolicy(Policies.ManageQuestions, policy =>
      {
        policy.RequireAuthenticatedUser();
        policy.AddRequirements(new FlagRequirement(Flags.MANAGE_QUESTIONS));
      });

      options.AddPolicy(Policies.ViewUsers, policy =>
      {
        policy.RequireAuthenticatedUser();
        policy.AddRequirements(new FlagRequirement(Flags.VIEW_USERS));
      });
      
      options.AddPolicy(Policies.Administrator, policy =>
      {
        policy.RequireAuthenticatedUser();
        policy.AddRequirements(new FlagRequirement(Flags.ADMINISTRATOR));
      });
    });
  }
}