using api.Repositories.Interfaces;
using api.RequestsAndResponses.Category;
using api.RequestsAndResponses.Product;
using api.Utils;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products;

public record GetProductsRequest
{
  [FromQuery(Name = "query")] public string? Query { get; init; }
  [FromQuery(Name = "category")] public int? Category { get; init; }
}

public class GetProducts : EndpointBaseAsync
  .WithRequest<GetProductsRequest>
  .WithActionResult<List<ProductResponse>>
{
  private readonly IMapper _mapper;
  private readonly IProductRepo _productRepo;
  private readonly ICategoryRepo _categoryRepo;

  public GetProducts(IMapper mapper, IProductRepo productRepo, ICategoryRepo categoryRepo)
  {
    _mapper = mapper;
    _productRepo = productRepo;
    _categoryRepo = categoryRepo;
  }

  [HttpGet(Routes.ProductsRoot)]
  public override async Task<ActionResult<List<ProductResponse>>> HandleAsync(
    [FromRoute] GetProductsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    List<Models.Product> products = new List<Models.Product>() { };

    if (request.Query is null && request.Category is null)
    {
      Console.WriteLine("both null");
      return Ok(_mapper.Map<List<ProductResponse>>(await _productRepo.GetManyNotDeleted()));
    }

    if (request.Query is not null && request.Category is null)
    {
      Console.WriteLine("query not null, category null");
      
      products = await _productRepo.GetManyNotDeleted();
      SearchUtils.OrderByNameStartsWith(products, request.Query);
      
      return Ok(_mapper.Map<List<ProductResponse>>(products));
    }

    if (request.Category is not null && request.Query is null)
    {
      Console.WriteLine("query null, category is not null");

      var allCategories = await _categoryRepo.GetAll();
      var ids = Utils.Categories.GetRelevantCategoryIds(allCategories, request.Category.Value);

      products = await _productRepo.Search(null, ids);

      return Ok(_mapper.Map<List<ProductResponse>>(products));
    }

    return Ok(_mapper.Map<List<ProductResponse>>(await _productRepo.GetManyNotDeleted()));
  }
}