<script setup>
/**
 * Imports
 */

import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
/**
 * Variables
 */

let editoriales = ref([]);
let id = ref(null);
const route = useRoute();
const router = useRouter();
let editorial = ref(null);

/**
 * Metodos
 */

onMounted(() => {
  console.log("Montado");
  id.value = route.params.id;
  console.log(id.value);
  consultarEditoriales(id.value);
});

let consultarEditoriales = async (id) => {
  axios
    .get("https://localhost:5000/api/editoriales")
    .then((datosRespuesta) => {
      console.log(datosRespuesta.data);
      editoriales.value = datosRespuesta.data;
      editorial.value = editoriales.value.find((o) => o.id == id);
    })
    .catch((err) => {
      console.log(err);
    });
};

let actualizarEditorial = async () => {
  const confirmacion = confirm(
    `Esta seguro que desea actualizar la Editorial "${editorial.value.nombre}"?`
  );
  if (confirmacion) {
    axios
      .put("https://localhost:5000/api/editoriales/"+editorial.value.id, editorial.value)
      .then((datos) => {
        console.log(datos);
        alert("Se ha actualizado la editorial");
        router.push({ name: 'editoriales'});
      })
      .catch((err) => {
        console.log(err);
        alert("Se presento un error: " + err.message);
      });
  }
};
</script>

<template>
  <div class="container">
    <div class="card" v-if="editorial">
      <div class="card-header">Editar Editorial: {{ editorial }}</div>
      <div class="card-body">
        <form v-on:submit.prevent="actualizarRegistro">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input
              type="text"
              class="form-control"
              required
              name="nombre"
              v-model="editorial.nombre"
              id="nombre"
              aria-describedby="helpId"
              placeholder="Nombre"
            />
            <small id="helpId" class="form-text text-muted"
              >Escribe el nuevo Nombre de la Editorial</small
            >
          </div>

          <div class="btn-group" role="group" aria-label="">
            <button
              :disabled="editorial.nombre.length < 4"
              @click.prevent="actualizarEditorial"
              class="btn btn-danger"
            >
              Guardar
            </button>
            <router-link :to="{ name: 'editoriales' }" class="btn btn-warning">Cancelar</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
