using api.Mapping.MappedTypes;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("products")]
public class ProductController : BaseController
{
  private readonly IProductService _productService;

  public ProductController(IProductService productService)
  {
    _productService = productService;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<ShowCaseProductResponse>>> GetProducts(string query)
  {
    var products = await _productService.GetManyShowcaseProducts(query);

    return Ok(products);
  }
}