namespace api.Exceptions;

public class BadRequestException : Exception
{
  public int StatusCode = StatusCodes.Status400BadRequest;

  public BadRequestException(string message) : base(message)
  {
  }
}