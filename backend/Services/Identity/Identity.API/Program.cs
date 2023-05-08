using Auth;
using Identity.Application.DI;
using Identity.WebApi.DI;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);


builder.Services.ConfigureCors()
    .ConfigureSqlServerContext(builder.Configuration)
    .ConfigureIdentity()
    .ConfigureIdentityServer(builder.Configuration);

builder.Services.ConfigureApi()
    .AddEndpointsApiExplorer();

builder.Services.AddControllers()
    .AddApplication();

builder.Services.AddBearerAuth(builder.Configuration["AUTH_URL"]);

//builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(builder.Configuration["SWAGGER_URL"]);

var app = await builder.Build()
    .MigrateDatabaseAsync();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(opt =>
    {
        opt.SwaggerEndpoint("/swagger/v1/swagger.json", "Swagger UI");
        opt.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.List);
        opt.OAuthClientId("client_id_swagger");
        opt.OAuthClientSecret("client_secret_swagger");
    });
}
app.UseCors("CorsPolicy");

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.All
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseIdentityServer();

app.Run();
