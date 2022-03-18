using api.DTOs.Product;
using api.Exceptions;
using api.Mapping.MappedTypes;
using api.Models.Product;
using api.Repositories.Interfaces;
using api.Services.Interfaces;
using AutoMapper;

namespace api.Services;

public class ProductService : IProductService
{
  private readonly IProductRepo _productRepo;
  private readonly IMapper _mapper;

  public ProductService(IProductRepo productRepo, IMapper mapper)
  {
    _productRepo = productRepo;
    _mapper = mapper;
  }

  public async Task<IEnumerable<ShowCaseProductResponse?>> GetManyShowcaseProducts(string query)
  {
    var products = await _productRepo
      .GetManyWithReviews(product => product.Name.ToLower().Contains(query)
                                     || product.Id.ToString().ToLower().Contains(query));

    if (!products.Any()) throw new NotFoundException("No products found");

    return _mapper.Map<IEnumerable<ShowCaseProductResponse>>(products);
  }

  public async Task<ProductPageProductResponse?> GetOneProductPageProduct(int productId)
  {
    var product = await _productRepo.GetOneWithEverything(productId);
    if (product is null) throw new NotFoundException("Product not found");

    return _mapper.Map<ProductPageProductResponse>(product);
  }

  public async Task<Product> Create(CreateProductDTO dto)
  {
    var newProduct = new Product()
    {
      Name = dto.Name,
      Description = dto.Description,
      Price = dto.Price,
      DiscountAmount = dto.DiscountAmount,
      DiscountedPrice = dto.DiscountedPrice,
      DiscountPercent = dto.DiscountPercent,
      IsDiscounted = dto.IsDiscounted
    };

    var createdProduct = await _productRepo.Add(newProduct);
    return createdProduct;
  }

  public async Task<Product> Update(UpdateProductDTO dto, int productId)
  {
    var existingProduct = await _productRepo.GetById(productId);

    existingProduct.Name = dto.Name ?? existingProduct.Name;
    existingProduct.Description = dto.Description ?? existingProduct.Description;
    existingProduct.Price = dto.Price ?? existingProduct.Price;
    existingProduct.DiscountedPrice = dto.DiscountedPrice ?? existingProduct.DiscountedPrice;
    existingProduct.DiscountPercent = dto.DiscountPercent ?? existingProduct.DiscountPercent;
    existingProduct.DiscountAmount = dto.DiscountAmount ?? existingProduct.DiscountAmount;
    existingProduct.IsDiscounted = dto.IsDiscounted ?? existingProduct.IsDiscounted;

    await _productRepo.Update(existingProduct);

    return existingProduct;
  }
  
  public async Task Remove(int productId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    product.IsDeleted = true;
    
    await _productRepo.Update(product);
  }
}