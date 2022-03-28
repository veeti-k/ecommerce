namespace api.Exceptions;

public class NotFoundException : MyException
{
  public NotFoundException(string message) : base(message, StatusCodes.Status404NotFound)
  {
  }
}

public static class NotFoundExceptionErrorMessages
{
  public static string ProductNotFoundException(int productId) =>
    $"Product with an id of {productId} was not found";

  public static string ProductBulletPointNotFoundException(Guid bulletPointId) =>
    $"Product bullet point with an id of {bulletPointId} was not found";

  public static string ProductQuestionNotFoundException(Guid questionId) =>
    $"Question with an id of {questionId} was not found";

  public static string ProductQuestionAnswerNotFoundException(Guid answerId) =>
    $"Question answer with an id of {answerId} was not found";

  public static string ProductReviewNotFoundException(Guid reviewId) =>
    $"Review with an id of {reviewId} was not found";

  public static string ProductReviewCommentNotFoundException(Guid commentId) =>
    $"Review comment with an id of {commentId} was not found";

  public static string AddressNotFoundException(Guid addressId) =>
    $"Address with an id of {addressId} was not found";

  public static string UserNotFoundException(int userId) =>
    $"User with an id of {userId} was not found";

  public static string SessionNotFoundException(Guid sessionId) =>
    $"Session with an id of {sessionId} was not found";

  public static string ProductCategoryNotFoundException(int categoryId) =>
    $"Product category with an id of {categoryId} was not found";
}

public class ProductNotFoundException : NotFoundException
{
  public ProductNotFoundException(int productId) : base(
    NotFoundExceptionErrorMessages.ProductNotFoundException(productId))
  {
  }
}

public class ProductBulletPointNotFoundException : NotFoundException
{
  public ProductBulletPointNotFoundException(Guid bulletPointId) : base(
    NotFoundExceptionErrorMessages.ProductBulletPointNotFoundException(bulletPointId)
  )
  {
  }
}

public class ProductQuestionNotFoundException : NotFoundException
{
  public ProductQuestionNotFoundException(Guid questionId) : base(
    NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(questionId))
  {
  }
}

public class ProductQuestionAnswerNotFoundException : NotFoundException
{
  public ProductQuestionAnswerNotFoundException(Guid answerId) : base(
    NotFoundExceptionErrorMessages.ProductQuestionAnswerNotFoundException(answerId)
  )
  {
  }
}

public class ProductReviewNotFoundException : NotFoundException
{
  public ProductReviewNotFoundException(Guid reviewId) : base(
    NotFoundExceptionErrorMessages.ProductReviewNotFoundException(reviewId))
  {
  }
}

public class ProductReviewCommentNotFoundException : NotFoundException
{
  public ProductReviewCommentNotFoundException(Guid commentId) : base(
    NotFoundExceptionErrorMessages.ProductReviewCommentNotFoundException(commentId)
  )
  {
  }
}

public class AddressNotFoundException : NotFoundException
{
  public AddressNotFoundException(Guid addressId) : base(
    NotFoundExceptionErrorMessages.AddressNotFoundException(addressId))
  {
  }
}

public class UserNotFoundException : NotFoundException
{
  public UserNotFoundException(int userId) : base(
    NotFoundExceptionErrorMessages.UserNotFoundException(userId))
  {
  }
}

public class SessionNotFoundException : NotFoundException
{
  public SessionNotFoundException(Guid sessionId) : base(
    NotFoundExceptionErrorMessages.SessionNotFoundException(sessionId))
  {
  }
}

public class ProductCategoryNotFoundException : NotFoundException
{
  public ProductCategoryNotFoundException(int categoryId) : base(
    NotFoundExceptionErrorMessages.ProductCategoryNotFoundException(categoryId)
  )
  {
  }
}