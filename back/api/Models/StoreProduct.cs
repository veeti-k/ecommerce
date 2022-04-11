namespace api.Models;

public class StoreProduct
{
  public Guid StoreId { get; set; }
  public int ProductId { get; set; }
  public int Quantity { get; set; }
}