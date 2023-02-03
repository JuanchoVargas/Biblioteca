namespace WebAPI.Entidades
{
  public class Libro
  {
    public int id { get; set; }
    public int editorial_id { get; set; }
    public int autor_id { get; set; }
    public string titulo { get; set; }
  }

}
