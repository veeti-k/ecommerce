using api.Data;

namespace api.Specifications.Address;

public class AddressGetUserAddressSpec : BaseSpec<Models.User.Address>
{
  public AddressGetUserAddressSpec(int userId, Guid addressId)
  {
    Criteria = address => address.Id == addressId && address.UserId == userId;
  } 
}