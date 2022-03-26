using System;
using api.Models.Product;
using api.RequestsAndResponses.Product;

namespace tests.UtilsForTesting.ProductThings;

public static class Products
{
  public static Product CreateFakeProduct() =>
    new Product()
    {
      Id = new Random().Next(),
      Name = Guid.NewGuid().ToString(),
      Description = Guid.NewGuid().ToString(),
      Price = new Random().NextDouble(),
      DiscountAmount = 0,
      DiscountedPrice = 0,
      DiscountPercent = 0,
      IsDeleted = false,
      IsDiscounted = false
    };

  public static Product CreateFakeProductFromDto(AddProductDto dto) =>
    new Product()
    {
      Id = new Random().Next(),
      Name = dto.Name,
      Description = dto.Description,
      Price = dto.Price,
      DiscountAmount = dto.DiscountAmount,
      DiscountedPrice = dto.DiscountedPrice,
      DiscountPercent = dto.DiscountPercent,
      IsDeleted = false,
      IsDiscounted = dto.IsDiscounted
    };

  public static AddProductDto CreateFakeCreateProductDto() =>
    new AddProductDto()
    {
      Name = Guid.NewGuid().ToString(),
      Description = Guid.NewGuid().ToString(),
      Price = new Random().NextDouble(),
      DiscountAmount = 0,
      DiscountedPrice = 0,
      DiscountPercent = 0,
      IsDiscounted = false
    };
}