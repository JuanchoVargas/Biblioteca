using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entidades;
using WebAPIAutores;

namespace WebAPI.Controllers
{
  [ApiController]
  [Route("api/editoriales")]
  public class EditorialesController : ControllerBase
  {
    private readonly ApplicationDBContext context;

    public EditorialesController(ApplicationDBContext context)
    {
      this.context = context;
    }

    [HttpGet(Name = "GetEditoriales")]
    public async Task<ActionResult<List<Editorial>>> Get()
    {
      return await context.Editorial.ToListAsync();
      // return await context.Autores.Include(x => x.Libros).ToListAsync();
    }

    [HttpGet(template: "id", Name = "GetEditorialesId")]
    public async Task<ActionResult<Editorial>> Get(int id)
    {
      return await context.Editorial.FirstOrDefaultAsync(x => x.id == id);
      // return await context.Libros.Include(x => x.Autor).FirstOrDefaultAsync(x => x.id == id);
    }

    [HttpPost(Name = "PostEditoriales")]
    public async Task<ActionResult> Post(Editorial editorial)
    {
      var mismoNombre = await context.Editorial.AnyAsync(x => x.nombre == editorial.nombre);

      if (mismoNombre)
      {
        return BadRequest($"Ya existe una editorial con el nombre:{editorial.nombre} ");
      }

      context.Add(editorial);
      await context.SaveChangesAsync();
      return Ok(editorial);
    }

    [HttpPut("{id:int}")] //? a
    public async Task<ActionResult> Put(Editorial editorial, int id)
    {
      var existe = await context.Editorial.AnyAsync(x => x.id == id);
      if (!existe)
      {
        return NotFound();
      }

      context.Update(editorial);
      await context.SaveChangesAsync();
      return Ok(editorial);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
      var existe = await context.Editorial.AnyAsync(x => x.id == id);
      if (!existe)
      {
        return NotFound();
      }

      context.Remove(new Editorial() { id = id });
      await context.SaveChangesAsync();
      return Ok(id);
    }
  }

}
