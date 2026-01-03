var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSpaStaticFiles(config =>
{
    if (builder.Environment.IsDevelopment())
    {
        config.RootPath = "web-app";
    }
});

var app = builder.Build();

app.UseRouting();
app.MapStaticAssets();

app.MapControllers();
app.UseEndpoints(end => end.MapControllers());
app.UseSpa(spa =>
{
    if (builder.Environment.IsDevelopment())
    {
        spa.Options.SourcePath = "web-app";
        spa.UseProxyToSpaDevelopmentServer("http://localhost:5173");
    }
});

app.Run();