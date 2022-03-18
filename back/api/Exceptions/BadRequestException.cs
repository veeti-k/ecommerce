namespace api.Exceptions;

public class BadRequestException : MyException
{
  public BadRequestException(string message) : base(message, StatusCodes.Status400BadRequest)
  {
  }
}