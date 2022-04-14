using api.RequestsAndResponses.Category;
using api.RequestsAndResponses.Product.Add;
using api.RequestsAndResponses.Product.Update;
using api.RequestsAndResponses.ProductQuestion.Add;
using api.RequestsAndResponses.ProductQuestionAnswer.Add;
using api.RequestsAndResponses.ProductReview.Add;
using api.RequestsAndResponses.ProductReviewComment.Add;
using api.RequestsAndResponses.Stores;
using FluentValidation;

namespace api.Startup;

public static class Validators
{
  public static void AddValidators(WebApplicationBuilder builder)
  {
    builder.Services.AddScoped<IValidator<AddStoreRequest>, AddStoreRequestValidator>();
    
    builder.Services.AddScoped<IValidator<AddCategoryRequest>, AddCategoryRequestValidator>();
    builder.Services.AddScoped<IValidator<UpdateCategoryRequest>, UpdateCategoryRequestValidator>();

    builder.Services.AddScoped<IValidator<AddProductRequest>, AddProductRequestValidator>();
    builder.Services.AddScoped<IValidator<UpdateProductRequest>, UpdateProductRequestValidator>();

    builder.Services.AddScoped<IValidator<AddProductQuestionRequest>, AddProductQuestionRequestValidator>();
    builder.Services.AddScoped<IValidator<AddProductQuestionAnswerRequest>, AddProductQuestionAnswerRequestValidator>();

    builder.Services.AddScoped<IValidator<AddProductReviewRequest>, AddProductReviewRequestValidator>();
    builder.Services.AddScoped<IValidator<AddProductReviewCommentRequest>, AddProductReviewCommentRequestValidator>();
  }
}