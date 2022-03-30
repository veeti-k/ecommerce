﻿using api.Models.Product;

namespace api.Repositories.Interfaces;

public interface IProductRepo : IGenericRepo<Product>
{
  public Task<Product?> GetOne(int productId);
  public Task<Product?> GetOneNotDeleted(int productId);
  public Task<Product?> GetOneNotDeletedWithBulletPointsAndCategories(int productId);
  public Task<IEnumerable<Product?>> GetManyNotDeletedWithBulletPoints();
}