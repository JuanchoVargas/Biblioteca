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
let autores = ref([]);
let id = ref(null);
const route = useRoute();
const router = useRouter();
let autor = ref(null);


/**
 * Metodos
 */
onMounted(() => {
  console.log("Montado");
  id.value = route.params.id;
  console.log(id.value);
  consultarAutor(id.value);
});

let consultarAutor = async (id) => {
  axios
    .get("https://localhost:5000/api/autores")
    .then((datosRespuesta) => {
      console.log(datosRespuesta.data);
      autores.value = datosRespuesta.data;
      autor.value = autores.value.find((o) => o.id == id);
    })
    .catch((err) => {
      console.log(err);
    });
};

let guardarAutor = async () => {
  const confirmacion = confirm(
    `Esta seguro que desea actualizar el autor "${autor.value.nombre}"?`
  );
  if (confirmacion) {
    axios
      .put("https://localhost:5000/api/autores/", autor.value)
      .then((datos) => {
        console.log(datos);
        alert("Se ha actualizado el autor");
        router.push({ name: 'autores'});
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
    <div class="card" v-if="autor">
      <div class="card-header">Editar Autor: {{ autor }}</div>
      <div class="card-body">
        <form v-on:submit.prevent="actualizarRegistro">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input
              type="text"
              class="form-control"
              required
              name="nombre"
              v-model="autor.nombre"
              id="nombre"
              aria-describedby="helpId"
              placeholder="Nombre"
            />
            <small id="helpId" class="form-text text-muted"
              >Escribe el nuevo Nombre del Autor</small
            >
          </div>

          <div class="btn-group" role="group" aria-label="">
            <button
              :disabled="autor.nombre.length < 4"
              @click.prevent="guardarAutor"
              class="btn btn-danger"
            >
              Guardar
            </button>
            <router-link :to="{ name: 'autores' }" class="btn btn-warning">Cancelar</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
