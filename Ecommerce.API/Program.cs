using Ecommerce.Business.Services;
using Ecommerce.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Ecommerce API", Version = "v1" });
});

// EF Core
builder.Services.AddDbContext<EcommerceContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//Servicios
builder.Services.AddScoped<IClienteService, ClienteService>();
builder.Services.AddScoped<IArticuloService, ArticuloService>();
builder.Services.AddScoped<ITiendaService, TiendaService>();

//Cors para Angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        builder => builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ecommerce API"));
}
app.UseCors("AllowAngular");
app.UseRouting();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<EcommerceContext>();
    dbContext.Database.Migrate();
}

app.MapControllers();
app.Run();