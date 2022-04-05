using api.Models.Product;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Product;
using api.RequestsAndResponses.Product.Add;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products;

public class AddProduct : EndpointBaseAsync
  .WithRequest<AddProductRequest>
  .WithActionResult<BaseProductResponse>
{
  private readonly IMapper _mapper;
  private readonly IProductRepo _repo;
  private readonly IGenericRepo<ProductBulletPoint> _bulletPointRepo;
  private readonly IGenericRepo<ProductImageLink> _imageRepo;

  public AddProduct(
    IMapper mapper, 
    IProductRepo repo, 
    IGenericRepo<ProductBulletPoint> bulletPointRepo, 
    IGenericRepo<ProductImageLink> imageRepo)
  {
    _mapper = mapper;
    _repo = repo;
    _bulletPointRepo = bulletPointRepo;
    _imageRepo = imageRepo;
  }

  [Authorize(Policy = Policies.ManageProducts)]
  [HttpPost(Routes.ProductsRoot)]
  public override async Task<ActionResult<BaseProductResponse>> HandleAsync(
    [FromRoute] AddProductRequest request, 
    CancellationToken cancellationToken = new CancellationToken())
  {
    var newProduct = new Models.Product.Product
    {
      Name = request.Dto.Name,
      Description = request.Dto.Description,
      Price = request.Dto.Price,
      DiscountAmount = request.Dto.DiscountAmount,
      DiscountedPrice = request.Dto.DiscountedPrice,
      DiscountPercent = request.Dto.DiscountPercent,
      IsDiscounted = request.Dto.IsDiscounted,
      CategoryId = request.Dto.CategoryId
    };
    
    var added = await _repo.Add(newProduct);

    foreach (var bulletPoint in request.Dto.BulletPoints)
    {
      await _bulletPointRepo.Add(new ProductBulletPoint()
      {
        BulletPointId = Guid.NewGuid(),
        ProductId = added.Id,
        Text = bulletPoint
      });
    }
    
    foreach (var link in request.Dto.ImageLinks)
    {
      await _imageRepo.Add(new ProductImageLink()
      {
        ProductImageLinkId = Guid.NewGuid(),
        ProductId = added.Id,
        Link = link
      });
    }
    
    return Created("", _mapper.Map<BaseProductResponse>(added));
  }
}