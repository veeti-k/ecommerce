using api.DTOs.Product;
using api.Exceptions;
using api.Mapping.MappedTypes.Product;
using api.Models.Product;
using api.Repositories.Interfaces.ProductRepos;
using api.Services.Interfaces.ProductServices;
using AutoMapper;

namespace api.Services.ProductServices;

public class ProductBulletPointService : IProductBulletPointService
{
  private readonly IMapper _mapper;
  private readonly IProductRepo _productRepo;
  private readonly IProductBulletPointRepo _productBulletPointRepo;

  public ProductBulletPointService(
    IMapper aMapper,
    IProductRepo aProductRepo,
    IProductBulletPointRepo aProductBulletPointRepo)
  {
    _mapper = aMapper;
    _productRepo = aProductRepo;
    _productBulletPointRepo = aProductBulletPointRepo;
  }

  public async Task<ProductBulletPointResponse> GetById(Guid bulletPointId)
  {
    var bulletPoint = await _productBulletPointRepo.GetById(bulletPointId);
    if (bulletPoint is null) throw new NotFoundException("Bullet point not found");

    return _mapper.Map<ProductBulletPointResponse>(bulletPoint);
  }

  public async Task<IEnumerable<ProductBulletPointResponse>> GetByProductId(int productId)
  {
    var bulletPoints = await _productBulletPointRepo.GetByProductId(productId);
    if (!bulletPoints.Any()) throw new NotFoundException("No bullet points found");

    return _mapper.Map<IEnumerable<ProductBulletPointResponse>>(bulletPoints);
  }

  public async Task<IEnumerable<ProductBulletPointResponse>> CreateMany(CreateProductBulletPointDTO dto, int productId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var createdBulletPoints = Enumerable.Empty<ProductBulletPoint>();

    var i = 0;
    foreach (var bulletPoint in dto.BulletPoints)
    {
      var newBulletPoint = new ProductBulletPoint()
      {
        Text = bulletPoint.Text,
        IsImportant = bulletPoint.IsImportant,
        ProductId = product.Id
      };
      i++;

      var added = await _productBulletPointRepo.Add(newBulletPoint, i == dto.BulletPoints.Count());
      createdBulletPoints.Append(added);
    }

    return _mapper.Map<IEnumerable<ProductBulletPointResponse>>(createdBulletPoints);
  }

  public async Task<ProductBulletPointResponse> Update(
    UpdateProductBulletPointDTO dto,
    Guid bulletPointId,
    int productId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var bulletPoint = await _productBulletPointRepo.GetById(bulletPointId);
    if (bulletPoint is null) throw new NotFoundException("Bullet point not found");

    bulletPoint.Text = dto.Text ?? bulletPoint.Text;
    bulletPoint.IsImportant = dto.IsImportant ?? bulletPoint.IsImportant;

    var updated = await _productBulletPointRepo.Update(bulletPoint);
    return _mapper.Map<ProductBulletPointResponse>(updated);
  }

  public async Task Remove(Guid bulletPointId, int productId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var bulletPoint = await _productBulletPointRepo.GetById(bulletPointId);
    if (bulletPoint is null) throw new NotFoundException("Bullet point not found");

    await _productBulletPointRepo.Remove(bulletPoint);
  }
}