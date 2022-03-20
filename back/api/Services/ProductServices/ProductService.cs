using api.DTOs.Product;
using api.Exceptions;
using api.Mapping.MappedTypes.Product;
using api.Models.Product;
using api.Repositories.Interfaces.ProductRepos;
using api.Services.Interfaces.ProductServices;
using AutoMapper;

namespace api.Services.ProductServices;

public class ProductService : IProductService
{
  private readonly IProductRepo _productRepo;
  private readonly IMapper _mapper;

  public ProductService(IProductRepo productRepo, IMapper mapper)
  {
    _productRepo = productRepo;
    _mapper = mapper;
  }

  public async Task<Product> GetById(int productId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    return product;
  }

  // temporary, will be removed when searching, filtering and stuff is implemented
  public async Task<IEnumerable<ShowCaseProductResponse?>> GetAll()
  {
    var products = await _productRepo.GetAll();
    return _mapper.Map<IEnumerable<ShowCaseProductResponse>>(products);
  }

  public async Task<ProductResponse> Create(CreateProductDTO dto)
  {
    var newProduct = new Product
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
    return _mapper.Map<ProductResponse>(createdProduct);
  }

  public async Task<ProductResponse> Update(UpdateProductDTO dto, int productId)
  {
    var existingProduct = await _productRepo.GetById(productId);
    if (existingProduct is null) throw new NotFoundException("Product not found");

    existingProduct.Name = dto.Name ?? existingProduct.Name;
    existingProduct.Description = dto.Description ?? existingProduct.Description;
    existingProduct.Price = dto.Price ?? existingProduct.Price;
    existingProduct.DiscountedPrice = dto.DiscountedPrice ?? existingProduct.DiscountedPrice;
    existingProduct.DiscountPercent = dto.DiscountPercent ?? existingProduct.DiscountPercent;
    existingProduct.DiscountAmount = dto.DiscountAmount ?? existingProduct.DiscountAmount;
    existingProduct.IsDiscounted = dto.IsDiscounted ?? existingProduct.IsDiscounted;

    var updatedProduct = await _productRepo.Update(existingProduct);

    return _mapper.Map<ProductResponse>(updatedProduct);
  }

  public async Task Remove(int productId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    product.IsDeleted = true;

    await _productRepo.Update(product);
  }
}