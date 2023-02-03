using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class ActualizacionT : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Libros",
                table: "Libros");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Editoriales",
                table: "Editoriales");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Autores",
                table: "Autores");

            migrationBuilder.RenameTable(
                name: "Libros",
                newName: "Libro");

            migrationBuilder.RenameTable(
                name: "Editoriales",
                newName: "Editorial");

            migrationBuilder.RenameTable(
                name: "Autores",
                newName: "Autor");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Libro",
                table: "Libro",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Editorial",
                table: "Editorial",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Autor",
                table: "Autor",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Libro",
                table: "Libro");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Editorial",
                table: "Editorial");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Autor",
                table: "Autor");

            migrationBuilder.RenameTable(
                name: "Libro",
                newName: "Libros");

            migrationBuilder.RenameTable(
                name: "Editorial",
                newName: "Editoriales");

            migrationBuilder.RenameTable(
                name: "Autor",
                newName: "Autores");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Libros",
                table: "Libros",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Editoriales",
                table: "Editoriales",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Autores",
                table: "Autores",
                column: "id");
        }
    }
}
