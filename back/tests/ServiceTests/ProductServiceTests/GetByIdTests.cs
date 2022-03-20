using System;
using System.Threading.Tasks;
using api.Exceptions;
using api.Mapping;
using api.Models.Product;
using api.Repositories.Interfaces.ProductRepos;
using api.Services.Interfaces.ProductServices;
using api.Services.ProductServices;
using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using tests.UtilsForTesting.ProductThings;
using Xunit;

namespace tests.ServiceTests.ProductServiceTests;

public class GetByIdTests
{
  private readonly Mock<IProductRepo> _mockProductRepo = new();
  private readonly IProductService _productService;
  private readonly int randomNumber = new Random().Next(1, Int32.MaxValue);

  public GetByIdTests()
  {
    var mapperConf = new MapperConfiguration(config => config
      .AddProfile(new DomainToResponseMappingProfile()));
    var mapper = mapperConf.CreateMapper();

    _productService = new ProductService(_mockProductRepo.Object, mapper);
  }

  [Fact]
  public async Task GetById_WithExistingProduct_DoesNotThrow_ReturnsExistingProduct()
  {
    var existingProduct = Products.CreateFakeProduct();

    _mockProductRepo.Setup(repo => repo
        .GetById(It.IsAny<int>()))
      .ReturnsAsync(existingProduct);

    Func<Task<Product>> test = async () => await _productService.GetById(existingProduct.Id);

    await test.Should().NotThrowAsync();
    var result = await test();

    result.Should().BeEquivalentTo(existingProduct);
  }

  [Fact]
  public async Task GetById_WithNoExistingProduct_ThrowsNotFoundException()
  {
    _mockProductRepo.Setup(repo => repo
        .GetById(It.IsAny<int>()))
      .ReturnsAsync((Product) null);

    Func<Task<Product>> test = async () => await _productService.GetById(randomNumber);

    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "Product not found"
      });
  }
}