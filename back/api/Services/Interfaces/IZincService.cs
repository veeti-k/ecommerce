using api.Models;
using api.RequestsAndResponses.Product.Add;

namespace api.Services.Interfaces;

public interface IZincService
{
  public Task UpsertProduct(Product product, List<BulletPointDto> bulletPoints, string imageLink);
}