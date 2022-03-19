namespace api.Endpoints;

public static class Routes
{
  private const string GlobalPrefix = "/api";

  public static class Auth
  {
    private const string Prefix = $"{GlobalPrefix}/auth";

    public const string Tokens = $"{Prefix}/tokens";
    public const string Login = $"{Prefix}/login";
    public const string Logout = $"{Prefix}/logout";
    public const string Register = $"{Prefix}/register";
  }

  public static class Users
  {
    private const string UsersPrefix = $"{GlobalPrefix}/users";
    private const string UserId = "{userId:int}";
    private const string AddressId = "{addressId:Guid}";
    
    public static class Me
    {
      public const string Main = $"{UsersPrefix}/me";

      public const string Addresses = $"{Main}/addresses";
      public const string AddressesAddress = $"{Addresses}/{AddressId}";
      public const string Sessions = $"{Main}/sessions";
    }

    public static class User
    {
      public const string Main = $"{UsersPrefix}/{UserId}";
      
      public const string Addresses = $"{Main}/addresses";
      public const string AddressesAddress = $"{Addresses}/{AddressId}";
      public const string Sessions = $"{Main}/sessions";
    }
  }

  public static class Products
  {
    public const string Main = $"{GlobalPrefix}/products";
    private const string ProductId = "{productId:int}";
    private const string ReviewId = "{reviewId:Guid}";
    private const string CommentId = "{commentId:Guid}";

    public const string Product = $"{Main}/{ProductId}";
    public const string Reviews = $"{Main}/{ProductId}/reviews";
    public const string ReviewsReview = $"{Reviews}/{ReviewId}";
    public const string ReviewComments = $"{ReviewsReview}/comments";
    public const string ReviewCommentsComment = $"{ReviewComments}/{CommentId}";
  }
}
