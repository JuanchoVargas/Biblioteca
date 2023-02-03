<script setup>
/**
 * Imports
 */
import axios from "axios";
import { ref, onMounted } from "vue";

/**
 * Variables
 */
let editoriales = ref([]);
onMounted(() => {
  console.log("Montado");
  consultarEditoriales();
});

/**
 * Metodos
 */
let consultarEditoriales = async () => {
  axios
    .get("https://localhost:5000/api/editoriales")
    .then((datosRespuesta) => {
      console.log(datosRespuesta.data);
      editoriales.value = datosRespuesta.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

let borrarEditorial = async (editorial) => {
  const confirmacion = confirm(
    `Esta seguro que desea borrar la editorial "${editorial.nombre}"?`
  );
  if (confirmacion) {
    axios
      .delete("https://localhost:5000/api/editoriales/" + editorial.id, {
        id: editorial.id,
      })
      .then((datosEliminados) => {
        consultarEditoriales();
        console.log(datosEliminados);
        alert("Se ha eliminado la editorial");
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
          <div class="col-md-6">Editoriales</div>
          <div class="col-md-6 text-right">
            <router-link :to="{ name: 'editorial-crear' }" class="nav-link">
              Agregar Editorial</router-link
            >
          </div>
        </div>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>ID Editorial</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="editorial in editoriales" key="editoriales.id">
              <td scope="row">{{ editorial.id }}</td>
              <td scope="row">{{ editorial.nombre }}</td>
              <td>
                <div class="btn-group" role="group" aria-label="">
                  <router-link
                    :to="{
                      name: 'editorial-editar',
                      params: { id: editorial.id }
                    }"
                    class="btn btn-warning"
                    >Editar</router-link
                  >
                  <button
                    type="button"
                    @click.prevent="borrarEditorial(editorial)"
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
