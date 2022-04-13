using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.Product.Add;
using api.RequestsAndResponses.Product.Update;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductTests;

public class UpdateProductTests : ProductIntegrationTest
{
  [Fact]
  public async Task UpdateProduct_WithExistingProduct_WithExistingCategory_UpdatesProduct_ReturnsUpdatedProduct()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);

    var newCategory = await AddCategory();

    var newImageLinks = new List<ProductImageDto>()
    {
      new ProductImageDto()
      {
        Id = product.Images[0].Id,
        Link = product.Images[0].Link
      },
      new ProductImageDto()
      {
        Id = product.Images[1].Id,
        Link = product.Images[1].Link + "test"
      },
      new ProductImageDto()
      {
        Link = Guid.NewGuid().ToString(),
      }
    };

    var newBulletPoints = new List<BulletPointDto>()
    {
      new BulletPointDto()
      {
        Id = product.BulletPoints[0].Id,
        Text = product.BulletPoints[0].Text
      },
      new BulletPointDto()
      {
        Id = product.BulletPoints[1].Id,
        Text = product.BulletPoints[1].Text + "test",
      },
      new BulletPointDto()
      {
        Text = Guid.NewGuid().ToString(),
      }
    };

    var request = new UpdateProductDto()
    {
      Name = TestProductDto.Name,
      Description = TestProductDto.Description,
      Price = TestProductDto.Price,
      IsDiscounted = TestProductDto.IsDiscounted,
      DiscountAmount = TestProductDto.DiscountAmount,
      DiscountedPrice = TestProductDto.DiscountedPrice,
      DiscountPercent = TestProductDto.DiscountPercent,
      DeepestCategoryId = newCategory.ProductCategoryId,
      BulletPoints = newBulletPoints,
      ImageLinks = newImageLinks,
    };

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await UpdateProduct_TEST_REQUEST(product.Id, request);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var updated = await GetProduct(product.Id);
    updated.Should()
      .BeEquivalentTo(request, options => options
        .Excluding(x => x.DeepestCategoryId)
        .Excluding(x => x.ImageLinks)
        .Excluding(x => x.BulletPoints)
      );

    updated.DeepestCategoryId.Should().Be(newCategory.ProductCategoryId);

    foreach (var (bulletPoint, i) in request.BulletPoints.Select((value, i) => (value, i)))
    {
      if (bulletPoint.Id is not null) {
        bulletPoint.Text.Should().Be(updated.BulletPoints[i].Text);
        bulletPoint.Id.Should().Be(updated.BulletPoints[i].Id);
      }
      else {
        bulletPoint.Text.Should().Be(updated.BulletPoints[i].Text);
      } 
    }

    foreach (var (imageLink, i) in request.ImageLinks.Select((value, i) => (value, i)))
    {
      if (imageLink.Id is not null) {
        imageLink.Link.Should().Be(updated.Images[i].Link);
        imageLink.Id.Should().Be(updated.Images[i].Id);
      }
      else {
        imageLink.Link.Should().Be(updated.Images[i].Link);
      } 
    }
  }

  [Fact]
  public async Task UpdateProduct_WithoutExistingProduct_ReturnsProductNotFound()
  {
    var category = await AddCategory();
    
    var request = new UpdateProductDto()
    {
      Name = TestProductDto.Name,
      Description = TestProductDto.Description,
      Price = TestProductDto.Price,
      IsDiscounted = TestProductDto.IsDiscounted,
      DiscountAmount = TestProductDto.DiscountAmount,
      DiscountedPrice = TestProductDto.DiscountedPrice,
      DiscountPercent = TestProductDto.DiscountPercent,
      DeepestCategoryId = category.ProductCategoryId,
      BulletPoints = TestProductDto.BulletPoints,
      ImageLinks = TestProductDto.ImageLinks,
    };

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await UpdateProduct_TEST_REQUEST(NonExistentIntId, request);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }
  
  [Fact]
  public async Task UpdateProduct_WithExistingProduct_WithoutExistingCategory_ReturnsCategoryNotFound()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);
    
    var request = new UpdateProductDto()
    {
      Name = TestProductDto.Name,
      Description = TestProductDto.Description,
      Price = TestProductDto.Price,
      IsDiscounted = TestProductDto.IsDiscounted,
      DiscountAmount = TestProductDto.DiscountAmount,
      DiscountedPrice = TestProductDto.DiscountedPrice,
      DiscountPercent = TestProductDto.DiscountPercent,
      DeepestCategoryId = NonExistentIntId,
      BulletPoints = TestProductDto.BulletPoints,
      ImageLinks = TestProductDto.ImageLinks,
    };

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await UpdateProduct_TEST_REQUEST(product.Id, request);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductCategoryNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task UpdateProduct_TestPerms()
  {
    await TestPermissions(
      () => UpdateProduct_TEST_REQUEST(NonExistentIntId, new UpdateProductDto() { }),
      new List<Flags> {Flags.MANAGE_PRODUCTS});
  }
}