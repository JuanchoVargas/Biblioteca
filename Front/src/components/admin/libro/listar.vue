<script setup>
/**
 * Imports
 */
import axios from "axios";
import { ref, onMounted } from "vue";

/**
 * Variables
 */
let libros = ref([]);
onMounted(() => {
  console.log("Montado");
  consultarLibros();
});


/**
 * Metodos
 */
let consultarLibros = async () => {
  axios
    .get("https://localhost:5000/api/libros")
    .then((datosRespuesta) => {
      console.log(datosRespuesta.data);
      libros.value = datosRespuesta.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

let borrarLibro = async (libro) => {
  const confirmacion = confirm(
    `Esta seguro que desea borrar el libro "${libro.titulo}"?`
  );
  if (confirmacion) {
    axios
      .delete("https://localhost:5000/api/libros/" + libro.id, {
        id: libros.id,
      })
      .then((datosEliminados) => {
        consultarLibros();
        console.log(datosEliminados);
        alert("Se ha eliminado el Libro");
      })
      .catch((err) => {
        console.log(err);
        alert("Se presento un error");
      });
  }
};
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6">Libros</div>
          <div class="col-md-6 text-right">
            <router-link :to="{ name: 'libro-crear' }" class="nav-link">
              Agregar Libro</router-link
            >
          </div>
        </div>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>ID Libro</th>
              <th>Nombre</th>
              <th>Autor</th>
              <th>Editorial</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="libro in libros" key="autores.id">
              <td scope="row">{{ libro.id }}</td>
              <td>{{ libro.titulo }}</td>
              <td>{{ libro.autor_id }}</td>
              <td>{{ libro.editorial_id }}</td>
              <td>
                <div class="btn-group" role="group" aria-label="">
                  <router-link
                    :to="{ name: 'libro-editar', params: { id: libro.id } }"
                    class="btn btn-warning"
                    >Editar</router-link
                  >
                  <button
                    type="button"
                    @click.prevent="borrarLibro(libro)"
                    class="btn btn-danger"
                  >
                    Borrar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
