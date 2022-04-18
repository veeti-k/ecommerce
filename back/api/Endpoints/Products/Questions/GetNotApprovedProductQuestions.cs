﻿using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestion;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Questions;

public class GetNotApprovedProductQuestions : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<ProductQuestionResponseWithProuduct>
{
  private readonly IMapper _mapper;
  private readonly IProductQuestionRepo _productQuestionRepo;

  public GetNotApprovedProductQuestions(IMapper mapper, IProductQuestionRepo productQuestionRepo)
  {
    _mapper = mapper;
    _productQuestionRepo = productQuestionRepo;
  }

  [Authorize(Policy = Policies.ManageQuestions)]
  [HttpGet(Routes.Products.NotApprovedQuestions)]
  public override async Task<ActionResult<ProductQuestionResponseWithProuduct>> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var notApprovedQuestions = await _productQuestionRepo.GetAllNotApprovedWithProduct();

    return Ok(_mapper.Map<List<ProductQuestionResponseWithProuduct>>(notApprovedQuestions));
  }
}