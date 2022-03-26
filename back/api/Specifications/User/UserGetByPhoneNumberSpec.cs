using api.Data;

namespace api.Specifications.User;

public class UserGetByPhoneNumberSpec : BaseSpec<Models.User.User>
{
  public UserGetByPhoneNumberSpec(string phoneNumber)
  {
    Criteria = user => user.PhoneNumber == phoneNumber;
  }
}