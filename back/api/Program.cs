
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddRouting(options => options.LowercaseUrls = true);

var app = builder.Build();

app.UseAuthorization();

app.UseHttpsRedirection();
app.MapControllers();
app.UseRouting();
app.Run("http://0.0.0.0:5000");