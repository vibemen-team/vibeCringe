using Confluent.Kafka;
using Kafka.Producers;
using MessageService;
using SignalR;
using Auth;
using Microsoft.AspNetCore.SignalR;
using Message.Infrastructure.Repositories;
using Identity.Domain.Data;
using Microsoft.EntityFrameworkCore;
using Message.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddBearerAuth(builder.Configuration["AUTH_URL"]);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<IdentityDbContext>(opts =>
                opts.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), b =>
                    b.MigrationsAssembly(typeof(IdentityDbContext).Assembly.GetName().Name))); ;

builder.Services.AddSingleton<IKafkaProducer<string, string>, SimpleStringProducer>();
builder.Services.AddScoped<StreamHub>();
builder.Services.AddScoped<BaseRepository>();
builder.Services.AddScoped<BaseService>();
builder.Services.AddScoped<ChatHub>();

//builder.Services.AddHostedService<MyConsumer>();
builder.Services.AddSignalR(hubOption=>hubOption.MaximumReceiveMessageSize=100_100);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x =>
{
    x.AllowAnyHeader();
    x.AllowAnyMethod();
    x.WithOrigins("http://localhost:4200", "http://localhost:62476");
    x.AllowCredentials();
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHub<StreamHub>("/streamHub", options => {
    options.TransportMaxBufferSize = 0;
    options.ApplicationMaxBufferSize = 0;
    options.WebSockets.CloseTimeout = TimeSpan.FromSeconds(10);
    options.LongPolling.PollTimeout = TimeSpan.FromSeconds(10);
    options.TransportSendTimeout = TimeSpan.FromSeconds(10);
});

app.MapHub<ChatHub>("/chat");

app.Run();
