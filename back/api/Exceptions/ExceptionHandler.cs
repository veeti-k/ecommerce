using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace api.Exceptions;

public class ExceptionHandler : ExceptionFilterAttribute
{
  public override void OnException(ExceptionContext context)
  {
    if (context.Exception is NotFoundException)
    {
      var ex = context.Exception as NotFoundException;
      context.Exception = null;

      context.Result = new JsonResult(ex.Message);
      context.HttpContext.Response.StatusCode = ex.StatusCode;
    }
    else if (context.Exception is BadRequestException)
    {
      var ex = context.Exception as BadRequestException;
      context.Exception = null;

      context.Result = new JsonResult(ex.Message);
      context.HttpContext.Response.StatusCode = ex.StatusCode;
    }
  }
}