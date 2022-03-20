using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.Exceptions;
using api.Mapping;
using api.Mapping.MappedTypes.Product;
using api.Models.Product;
using api.Repositories.Interfaces.ProductRepos;
using api.Services.Interfaces.ProductServices;
using api.Services.ProductServices;
using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using Xunit;

namespace tests.ServiceTests.ProductServiceTests;

public class GetManyShowcaseProductsTests
{
  private readonly Mock<IProductRepo> _mockProductRepo = new();
  private readonly IProductService _productService;

  public GetManyShowcaseProductsTests()
  {
    var mapperConf = new MapperConfiguration(config => config
      .AddProfile(new DomainToResponseMappingProfile()));
    var mapper = mapperConf.CreateMapper();

    _productService = new ProductService(_mockProductRepo.Object, mapper);
  }

  [Fact]
  public async Task GetManyShowcaseProducts_WithNoProducts_ThrowsNotFoundException()
  {
    _mockProductRepo.Setup(mock => mock
        .GetManyWithReviews(It.IsAny<Expression<Func<Product, bool>>>()))
      .ReturnsAsync(Enumerable.Empty<Product>());

    Func<Task<IEnumerable<ShowCaseProductResponse>>> test = async () =>
      await _productService.GetManyShowcaseProducts(Guid.NewGuid().ToString());
    
    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "No products found"
      });
  }
}