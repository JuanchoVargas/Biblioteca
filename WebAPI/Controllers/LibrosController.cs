using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entidades;
using WebAPIAutores;

namespace WebAPI.Controllers
{
  [ApiController]
  [Route("api/libros")]
  public class LibrosController : ControllerBase
  {
    private readonly ApplicationDBContext context;

    public LibrosController(ApplicationDBContext context)
    {
      this.context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Libro>>> Get()
    {
      return await context.Libro.ToListAsync();
    }

    [HttpGet("titulo")]
    public async Task<ActionResult<Libro>> Get(string nombre)
    {
      var tituloLibro = await context.Libro.FirstOrDefaultAsync(a => a.titulo.Contains(nombre));
      if (tituloLibro == null)
      {
        return NotFound();
      }
      return tituloLibro;
    }

    [HttpPost]
    public async Task<ActionResult> Post(Libro libro)
    {
      var mismoNombre = await context.Libro.AnyAsync(x => x.titulo == libro.titulo);

      if (mismoNombre)
      {
        return BadRequest($"Ya existe un libro con el Titulo:{libro.titulo} ");
      }

      context.Add(libro);
      await context.SaveChangesAsync();
      return Ok(libro);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(Libro titulo, int id)
    {
      if (titulo.id != id)
      {
        return BadRequest("El id  del Libro no coincide con el id de la URL");
      }

      var existe = await context.Libro.AnyAsync(x => x.id == id);
      if (!existe)
      {
        return NotFound();
      }

      context.Update(titulo);
      await context.SaveChangesAsync();
      return Ok(titulo);
    }

    [HttpDelete("{id:int}")] //? De la misma manera que en actualizacion 
    public async Task<ActionResult> Delete(int id)
    {
      var existe = await context.Libro.AnyAsync(x => x.id == id);
      if (!existe)
      {
        return NotFound();
      }

      context.Remove(new Libro() { id = id });
      await context.SaveChangesAsync();
      return Ok(id);
    }
  }
}
