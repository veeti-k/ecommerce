namespace api.Exceptions;

public class NotFoundException : Exception
{
  public int StatusCode = StatusCodes.Status404NotFound;

  public NotFoundException(string message) : base(message)
  {
  }
}