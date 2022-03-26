using api.Data;

namespace api.Specifications.Address;

public class AddressGetUserAddressesSpec : BaseSpec<Models.User.Address>
{
  public AddressGetUserAddressesSpec(int userId)
  {
    Criteria = address => address.UserId == userId;
  }
}