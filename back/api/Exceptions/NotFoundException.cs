namespace api.Exceptions;

public class NotFoundException : MyException
{
  public NotFoundException(string message) : base(message, StatusCodes.Status404NotFound)
  {
  }
}