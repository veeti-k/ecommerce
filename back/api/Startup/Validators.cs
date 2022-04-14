using api.RequestsAndResponses.Category;
using api.RequestsAndResponses.Product.Add;
using api.RequestsAndResponses.Product.Update;
using api.RequestsAndResponses.StoreHours;
using api.RequestsAndResponses.Stores;
using FluentValidation;

namespace api.Startup;

public static class Validators
{
  public static void AddValidators(WebApplicationBuilder builder)
  {
    builder.Services.AddScoped<IValidator<AddProductDto>, AddProductDtoValidator>();
    builder.Services.AddScoped<IValidator<UpdateProductDto>, UpdateProductDtoValidator>();
    builder.Services.AddScoped<IValidator<AddStoreRequest>, AddStoreRequestValidator>();
    builder.Services.AddScoped<IValidator<AddDefaultHoursRequestBody>, AddDefaultHoursRequestBodyValidator>();
    builder.Services.AddScoped<IValidator<UpdateDefaultHoursRequest>, UpdateDefaultHoursRequestValidator>();
    builder.Services.AddScoped<IValidator<UpdateCategoryRequest>, UpdateCategoryRequestValidator>();
    builder.Services.AddScoped<IValidator<AddCategoryRequest>, AddCategoryRequestValidator>();
  }
}