namespace api.Exceptions;

public class ErrorHandlerMiddleware
{
  private readonly RequestDelegate _next;

  public ErrorHandlerMiddleware(RequestDelegate next)
  {
    _next = next;
  }

  public async Task Invoke(HttpContext context)
  {
    try
    {
      await _next(context);
    }
    catch (MyException exception)
    {
      var response = context.Response;
      response.ContentType = "application/json";

      response.StatusCode = exception.StatusCode;
      response.WriteAsJsonAsync(new {message = exception.Message});
    }
  }
}