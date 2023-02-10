using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entidades;
using WebAPIAutores;

namespace WebAPI.Controllers
{
  [ApiController]
  [Route("api/autores")]

  public class AutoresController : ControllerBase
  {
    private readonly ApplicationDBContext context;
    public AutoresController(ApplicationDBContext context)
    {
      this.context = context;
    }

    [HttpGet]
    public List<Autor> Obtener()
    {
      return context.Autor.ToList();
      // return await context.Autores.Include(x => x.Libros).ToListAsync();
    }

    // api/autores/:id
    [HttpGet("{id:int}")]
    public ActionResult ObtenerPorId(int id)
    {
      return Ok(context.Autor.FirstOrDefault(o => o.id == id));
    }

    [HttpGet("nombre")]
    public async Task<ActionResult<Autor>> ObtenerPorNombre(string nombre)
    {
      var autor = await context.Autor.FirstOrDefaultAsync(a => a.nombre.Contains(nombre)); //*Query a la base de datos
                                                                                           // var autor = await context.Autores.Include(x => x.Libros).FirstOrDefaultAsync(a => a.Nombre.Contains(nombre)); //*Query a la base de datos
      if (autor == null)
      {
        return NotFound();
      }
      return autor;
    }

    [HttpPost]
    public async Task<ActionResult> Crear(Autor autor)
    {
      var mismoNombre = await context.Autor.AnyAsync(x => x.nombre == autor.nombre);

      if (mismoNombre)
      {
        return BadRequest($"Ya existe un autor con el nombre \"{autor.nombre}\"");
      }

      context.Add(autor);
      await context.SaveChangesAsync();
      return Ok(autor);
    }

    [HttpPut] //? api/autores esta es la URL donde se realizara la accion
    public async Task<ActionResult> Actualizar(Autor autor)
    {
      context.Update(autor);
      await context.SaveChangesAsync();
      return Ok(autor);
    }

    /*
        [HttpPut("{id:int}")] //? api/autores/1 esta es la URL donde se realizara la accion
        public async Task<ActionResult> Put(Autor autor, int id)
        {
          if (autor.id != id)
          {
            return BadRequest("El id del autor no coincide con el id de la URL");
          }

          var existe = await context.Autores.AnyAsync(x => x.id == id);
          if (!existe)
          {
            return NotFound();
          }

          context.Update(autor);
          await context.SaveChangesAsync();
          return Ok(autor);
        }
        */

    [HttpDelete("{id:int}")] //? De la misma manera que en actualizacion 
    public async Task<ActionResult> Borrar(int id)
    {
      var existe = await context.Autor.AnyAsync(x => x.id == id);
      if (!existe)
      {
        return NotFound();
      }

      context.Remove(new Autor() { id = id });
      await context.SaveChangesAsync();
      return Ok(id);
    }
  }
}
