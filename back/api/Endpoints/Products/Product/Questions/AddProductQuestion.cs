using api.Exceptions;
using api.Models.Product.Question;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestion;
using api.RequestsAndResponses.ProductQuestion.Add;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions;

public class AddProductQuestion : EndpointBaseAsync
  .WithRequest<CreateProductQuestionRequest>
  .WithActionResult<ProductQuestionResponse>
{

  private readonly IMapper _mapper;
  private readonly IGenericRepo<Models.Product.Product> _productRepo;
  private readonly IGenericRepo<ProductQuestion> _productQuestionRepo;

  public AddProductQuestion(
    IMapper mapper, 
    IGenericRepo<Models.Product.Product> productRepo, 
    IGenericRepo<ProductQuestion> productQuestionRepo)
  {
    _mapper = mapper;
    _productRepo = productRepo;
    _productQuestionRepo = productQuestionRepo;
  }

  [HttpPost(Routes.Products.Product.QuestionsRoot)]
  public override async Task<ActionResult<ProductQuestionResponse>> HandleAsync(
    [FromRoute] CreateProductQuestionRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new NotFoundException($"Product with id {request.ProductId} was not found");
    
    ProductQuestion newQuestion = new()
    {
      QuestionersNickname = request.Dto.QuestionersNickname,
      Title = request.Dto.Title,
      Content = request.Dto.Content,
      CreatedAt = DateTimeOffset.UtcNow,
      ProductId = product.Id,
      IsApproved = false
    };

    var added = await _productQuestionRepo.Add(newQuestion);
    return _mapper.Map<ProductQuestionResponse>(added);
  }
}