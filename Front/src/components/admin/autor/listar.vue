<script setup>
/**
 * Imports
 */
import axios from "axios";
import { ref, onMounted } from "vue";

/**
 * Variables
 */
let autores = ref([]);

/**
 * Metodos
 */
onMounted(() => {
  console.log("Montado");
  consultarAutores();
});

let consultarAutores = async () => {
  axios
    .get("http://localhost:5000/api/autores")
    .then((datosRespuesta) => {
      console.log(datosRespuesta.data);
      autores.value = datosRespuesta.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

let borrarAutor = async (autor) => {
  const confirmacion = confirm(
    `Esta seguro que desea borrar el autor "${autor.nombre}"?`
  );
  if (confirmacion) {
    // this.autores = this.autores.filter((user) => user.id !== id);
    axios
      .delete("https://localhost:5000/api/autores/" + autor.id, {
        id: autores.id
      })
      .then((datosEliminados) => {
        consultarAutores();
        console.log(datosEliminados);
        alert("Se ha eliminado el autor");
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
          <div class="col-md-6">Autores</div>
          <div class="col-md-6 text-right">
            <router-link :to="{ name: 'autor-crear' }" class="nav-link"
              >Crear autor</router-link
            >
          </div>
        </div>
      </div>
      <div class="card-body">
        <table class="table" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="autor in autores" key="autores.id">
              <td scope="row">{{ autor.id }}</td>
              <td>{{ autor.nombre }}</td>
              <td>
                <div class="btn-group" role="group" aria-label="">
                  <router-link
                    :to="{ name: 'autor-editar', params: { id: autor.id } }"
                    class="btn btn-warning"
                    >Editar</router-link
                  >
                  <button
                    type="button"
                    @click.prevent="borrarAutor(autor)"
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
