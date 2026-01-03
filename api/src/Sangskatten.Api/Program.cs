using Microsoft.AspNetCore.StaticFiles;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSpaStaticFiles(config =>
{
    if (builder.Environment.IsDevelopment())
    {
        config.RootPath = "wwwroot/web-app";
    }
});

var fileExtensionMapper = new FileExtensionContentTypeProvider();

fileExtensionMapper.Mappings[".musicxml"] = "application/xml";

builder.Services.Configure<StaticFileOptions>(options =>
{
    options.ContentTypeProvider = fileExtensionMapper;
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
        spa.Options.SourcePath = "wwwroot/web-app";
        spa.UseProxyToSpaDevelopmentServer("http://localhost:5173");
    }
});

app.Run();