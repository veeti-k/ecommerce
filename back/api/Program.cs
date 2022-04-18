using api.Configs;
using api.Data;
using api.Exceptions;
using api.Models;
using api.Models.Question;
using api.Models.Review;
using api.Models.User;
using api.Repositories;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Category;
using api.RequestsAndResponses.Product.Add;
using api.RequestsAndResponses.Product.Update;
using api.RequestsAndResponses.StoreHours;
using api.RequestsAndResponses.Stores;
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
builder.Services.AddHttpClient();

builder.Services.AddScoped<IDataContext, DataContext>();

builder.Services.AddScoped<IContextService, ContextService>();
builder.Services.AddScoped<IRevalidationService, RevalidationService>();

builder.Services.AddSingleton<ICookieUtils, CookieUtils>();
builder.Services.AddSingleton<ITokenUtils, TokenUtils>();
builder.Services.AddScoped<IAuthUtils, AuthUtils>();

Repos.AddRepos(builder);
Validators.AddValidators(builder);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.Configure<TokenOptions>(
  builder.Configuration.GetSection(TokenOptions.Position));

builder.Services.Configure<Revalidation>(
  builder.Configuration.GetSection("Urls"));

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