using Car_Dealer.Database;
using Car_Dealer.Interfaces;
using Car_Dealer.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllersWithViews();

var configuration = builder.Configuration;

builder.Services.AddDbContext<AutoDatabase>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DbConnectionString")));

builder.Services.AddScoped<IAutoService, AutoDatabaseService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
