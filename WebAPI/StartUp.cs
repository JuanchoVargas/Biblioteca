using System;
using Microsoft.EntityFrameworkCore;
using WebAPIAutores;

namespace WebAPI
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {

      services.AddCors();
      services.AddDbContext<ApplicationDBContext>(options =>
      options.UseSqlServer(Configuration.GetConnectionString("defaultConnection")));

      services.AddEndpointsApiExplorer();
      services.AddAuthorization();
      services.AddControllers();
      services.AddHealthChecks();
      services.AddSwaggerGen();

    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

      app.UseCors(options =>
      {
        options.WithOrigins("*")
        .AllowAnyMethod()
        .AllowAnyHeader();
      });


      if (env.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }


      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }

}
