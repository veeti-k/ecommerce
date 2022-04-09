using api.Exceptions;
using api.Models.Question;
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
  private readonly IProductRepo _productRepo;
  private readonly IProductQuestionRepo _productQuestionRepo;

  public AddProductQuestion(
    IMapper mapper, 
    IProductRepo productRepo, 
    IProductQuestionRepo productQuestionRepo)
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
    var product = await _productRepo.GetOneNotDeleted(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);
    
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
    return Created("", _mapper.Map<ProductQuestionResponse>(added));
  }
}