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

  public const string ProductsRoot = $"{GlobalPrefix}/products";

  public static class Products
  {
    private const string ProductId = "{productId:int}";

    private const string ReviewId = "{reviewId:Guid}";
    private const string CommentId = "{commentId:Guid}";

    private const string QuestionId = "{questionId:Guid}";
    private const string AnswerId = "{answerId:Guid}";

    public const string ProductRoot = $"{ProductsRoot}/{ProductId}";

    public static class Product
    {
      public const string ReviewsRoot = $"{ProductRoot}/reviews";

      public static class Reviews
      {
        public const string ReviewRoot = $"{ReviewsRoot}/{ReviewId}";

        public static class Review
        {
          public const string CommentsRoot = $"{ReviewRoot}/comments";

          public static class Comments
          {
            public const string Comment = $"{CommentsRoot}/{CommentId}";
          }
        }
      }

      public const string QuestionsRoot = $"{ProductRoot}/questions";

      public static class Questions
      {
        public const string QuestionRoot = $"{QuestionsRoot}/{QuestionId}";

        public static class Quesion
        {
          public const string AnswersRoot = $"{QuestionRoot}/answers";

          public static class Answers
          {
            public const string Answer = $"{AnswersRoot}/{AnswerId}";
          }
        }
      }
    }
  }
}