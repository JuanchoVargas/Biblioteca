<script setup>
/**
 * Imports
 */
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

/**
 * Variables
 */
const router = useRouter();
let autor = ref({ id: 0, nombre: "" });


/**
 * Metodos
 */
let guardarAutor = async () => {
  const confirmacion = confirm(
    `Esta seguro que desea guardar el autor "${autor.value.nombre}"?`
  );
  if (confirmacion) {
    axios
      .post("https://localhost:5000/api/autores/", autor.value)
      .then((datos) => {
        console.log(datos);
        alert("Se ha creado el autor");
        router.push({ name: "autores" });
      })
      .catch((err) => {
        console.log("El error =>", err);
        alert("Se presento un error: " + err.response.data);
      });
  }
};
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Crear Nuevo Autor: {{ autor }}</div>
      <div class="card-body">
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
            >Escribe el Nombre del Autor</small
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
          <router-link :to="{ name: 'autores' }" class="btn btn-warning"
            >Cancelar</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
