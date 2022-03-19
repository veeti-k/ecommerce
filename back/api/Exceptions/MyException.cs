namespace api.Exceptions;

public class MyException : Exception
{
  public readonly int StatusCode;

  public MyException(string message, int aStatusCode) : base(message)
  {
    StatusCode = aStatusCode;
  }
}