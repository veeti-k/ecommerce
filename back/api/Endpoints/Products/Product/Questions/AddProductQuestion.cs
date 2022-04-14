using api.Exceptions;
using api.Models.Question;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestion;
using api.RequestsAndResponses.ProductQuestion.Add;
using Ardalis.ApiEndpoints;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions;

public class AddProductQuestion : EndpointBaseAsync
  .WithRequest<AddProductQuestionRequest>
  .WithActionResult<ProductQuestionResponse>
{
  private readonly IMapper _mapper;
  private readonly IProductRepo _productRepo;
  private readonly IProductQuestionRepo _productQuestionRepo;
  private readonly IValidator<AddProductQuestionRequest> _validator;

  public AddProductQuestion(
    IMapper mapper,
    IProductRepo productRepo,
    IProductQuestionRepo productQuestionRepo,
    IValidator<AddProductQuestionRequest> validator)
  {
    _mapper = mapper;
    _productRepo = productRepo;
    _productQuestionRepo = productQuestionRepo;
    _validator = validator;
  }

  [HttpPost(Routes.Products.Product.QuestionsRoot)]
  public override async Task<ActionResult<ProductQuestionResponse>> HandleAsync(
    [FromRoute] AddProductQuestionRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var validationResult = await _validator.ValidateAsync(request, cancellationToken);
    if (!validationResult.IsValid) throw new BadRequestException(validationResult.ToString());
    

    var product = await _productRepo.GetOneNotDeleted(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    ProductQuestion newQuestion = new()
    {
      QuestionersNickname = request.Body.QuestionersNickname,
      Title = request.Body.Title,
      Content = request.Body.Content,
      CreatedAt = DateTimeOffset.UtcNow,
      ProductId = product.ProductId,
      IsApproved = false
    };

    var added = await _productQuestionRepo.Add(newQuestion);
    return Created("", _mapper.Map<ProductQuestionResponse>(added));
  }
}