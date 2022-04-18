namespace api.Endpoints;

public static class Routes
{
  public const string GlobalPrefix = "/back";

  public static class Auth
  {
    public const string Prefix = $"{GlobalPrefix}/auth";

    public const string Tokens = $"{Prefix}/tokens";
    public const string Login = $"{Prefix}/login";
    public const string Logout = $"{Prefix}/logout";
    public const string Register = $"{Prefix}/register";
  }

  public static class Users
  {
    public const string UsersPrefix = $"{GlobalPrefix}/users";
    public const string UserId = "{userId:int}";
    public const string AddressId = "{addressId:Guid}";
    public const string SessionId = "{sessionId:Guid}";

    public const string MeRoot = $"{UsersPrefix}/me";

    public static class Me
    {
      public const string Flags = $"{MeRoot}/flags";
      public const string SessionsRoot = $"{MeRoot}/sessions";

      public static class Sessions
      {
        public const string Session = $"{SessionsRoot}/{SessionId}";
      }

      public const string AddressesRoot = $"{MeRoot}/addresses";

      public static class Addresses
      {
        public const string Address = $"{AddressesRoot}/{AddressId}";
      }
    }

    public const string UserRoot = $"{UsersPrefix}/{UserId}";

    public static class User
    {
      public const string Flags = $"{UserRoot}/flags";
      public const string Sessions = $"{UserRoot}/sessions";

      public const string AddressesRoot = $"{UserRoot}/addresses";

      public static class Addresses
      {
        public const string Address = $"{AddressesRoot}/{AddressId}";
      }
    }
  }

  public const string ProductsRoot = $"{GlobalPrefix}/products";

  public static class Products
  {
    public const string ProductId = "{productId:int}";

    public const string ReviewId = "{reviewId:Guid}";
    public const string CommentId = "{commentId:Guid}";

    public const string QuestionId = "{questionId:Guid}";
    public const string AnswerId = "{answerId:Guid}";

    public const string BulletPointId = "{bulletPointId:Guid}";

    public const string ReviewsRoot = $"{ProductsRoot}/reviews";
    public const string QuestionsRoot = $"{ProductsRoot}/questions";

    public const string ProductRoot = $"{ProductsRoot}/{ProductId}";

    public static class Product
    {
      public const string BulletPointsRoot = $"{ProductRoot}/bullet-points";

      public static class BulletPoints
      {
        public const string BulletPoint = $"{BulletPointsRoot}/{BulletPointId}";
      }

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

  public const string CategoriesRoot = $"{GlobalPrefix}/categories";

  public static class Categories
  {
    public const string CategoryId = "{categoryId:int}";

    public const string CategoryRoot = $"{CategoriesRoot}/{CategoryId}";
  }

  public const string StoresRoot = $"{GlobalPrefix}/stores";

  public static class Stores
  {
    public const string StoreId = "{storeId:Guid}";
    public const string ExceptionId = "{exceptionId:Guid}";

    public const string StoreRoot = $"{StoresRoot}/{StoreId}";

    public static class Store
    {
      public const string HoursRoot = $"{StoreRoot}/hours";

      public static class Hours
      {
        public const string Default = $"{HoursRoot}/default";

        public const string ExceptionsRoot = $"{HoursRoot}/exceptions";
        public const string Exception = $"{HoursRoot}/exceptions/{ExceptionId}";
      }
    }
  }
}