using Microsoft.EntityFrameworkCore;
using WebAPI.Entidades;
namespace WebAPIAutores
{
  public class ApplicationDBContext : DbContext
  {
    public ApplicationDBContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Autor> Autor { get; set; }
    public DbSet<Libro> Libro { get; set; }
    public DbSet<Editorial> Editorial { get; set; }
  }
}
