namespace api.Exceptions;

public class ForbiddenException : MyException
{
  public ForbiddenException(string message) : base(message, StatusCodes.Status403Forbidden)
  {
  }
}