using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Category;
using api.RequestsAndResponses.Product;
using api.RequestsAndResponses.Product.GetOne;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product;

public class GetProduct : EndpointBaseAsync
  .WithRequest<GetOneRequest>
  .WithActionResult<ProductPageProductResponse>
{
  private readonly IMapper _mapper;
  private readonly IProductRepo _productRepo;
  private readonly ICategoryRepo _categoryRepo;

  public GetProduct(IMapper mapper, IProductRepo productRepo, ICategoryRepo categoryRepo)
  {
    _mapper = mapper;
    _productRepo = productRepo;
    _categoryRepo = categoryRepo;
  }

  [HttpGet(Routes.Products.ProductRoot)]
  public override async Task<ActionResult<ProductPageProductResponse>> HandleAsync(
    [FromRoute] GetOneRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetOneNotDeletedWithCategories(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var mapped = _mapper.Map<ProductPageProductResponse>(product);
    
    var categories = await _categoryRepo.GetAll();
    var path = Utils.Categories.GetCategoryPath(categories, product.DeepestCategoryId);
    mapped.Path = _mapper.Map<List<CategoryResponse>>(path);

    return Ok(mapped);
  }
}