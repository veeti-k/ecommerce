namespace api.Exceptions;

public class UnauthorizedException : MyException
{
  public UnauthorizedException(string message) : base(message, StatusCodes.Status401Unauthorized)
  {
  }
}