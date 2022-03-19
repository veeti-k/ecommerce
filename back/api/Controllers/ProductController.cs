using api.DTOs.Product;
using api.Mapping.MappedTypes;
using api.Security;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
  
  [HttpGet("{productId:int}")]
  public async Task<ActionResult<ProductPageProductResponse>> GetProduct(int productId)
  {
    var product = await _productService.GetOneProductPageProduct(productId);

    return Ok(product);
  }

  [HttpPost]
  [Authorize(Policy = CrucialStrings.ManageProducts)]
  public async Task<ActionResult<ProductCreatedResponse>> CreateProduct(CreateProductDTO dto)
  {
    var createdProduct = await _productService.Create(dto);

    return Ok(createdProduct);
  }
  
  [HttpPatch("{productId:int}")]
  [Authorize(Policy = CrucialStrings.ManageProducts)]
  public async Task<ActionResult<ProductUpdatedResponse>> UpdateProduct(UpdateProductDTO dto, int productId)
  {
    var updatedProduct = await _productService.Update(dto, productId);

    return Ok(updatedProduct);
  }
  
  [HttpDelete("{productId:int}")]
  [Authorize(Policy = CrucialStrings.ManageProducts)]
  public async Task<ActionResult> RemoveProduct(int productId)
  {
    await _productService.Remove(productId);

    return NoContent();
  }
}