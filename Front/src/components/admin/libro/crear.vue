<script setup>
/**
 * Imports
 */
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

/**
 * Variables
 */
const router = useRouter();
let libro = ref({
  id: 0,
  editorial_id: 0,
  autor_id: 0,
  titulo: "",
});

let autores = ref([]);
let editoriales = ref([]);

/**
 * Metodos
 */

onMounted(() => {
  console.log("Montado");
  consultarAutores();
  consultarEditoriales();
});

let consultarAutores = async () => {
  axios
    .get("https://localhost:5000/api/autores")
    .then((datosRespuesta) => {
      console.log(datosRespuesta.data);
      autores.value = datosRespuesta.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

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

let guardarLibro = async () => {
  const confirmacion = confirm(
    `Esta seguro que desea guardar el Libro "${libro.value.titulo}"?`
  );
  if (confirmacion) {
    axios
      .post("https://localhost:5000/api/libros", libro.value)
      .then((datos) => {
        console.log(datos);
        alert("Se ha creado el Libro");
        router.push({ name: "libros" });
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
      <div class="card-header">Crear Nuevo Libro: {{ libro.titulo }}</div>
      <div class="card-body">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input
            type="text"
            class="form-control"
            required
            name="nombre"
            v-model="libro.titulo"
            id="nombre"
            aria-describedby="helpId"
            placeholder="Nombre"
          />
          <small id="helpId" class="form-text text-muted"
            >Escribe el Nombre del Libro</small
          >
        </div>
        <div class="form-group">
          <label for="nombre">Autor:</label>
          <select
            type="text"
            class="form-control"
            required
            name="nombre"
            v-model="libro.autor_id"
            id="nombre_autor"
            aria-describedby="helpId"
            placeholder="Nombre"
          >
            <option v-for="autor in autores" key="autores.id" :value="autor.id">
              {{ autor.nombre }}
            </option>
          </select>

          <small id="helpId" class="form-text text-muted"
            >Seleccione el Autor</small
          >
        </div>
        <div class="form-group">
          <label for="nombre">Editorial:</label>
          <select
            type="text"
            class="form-control"
            required
            name="nombre"
            v-model="libro.editorial_id"
            id="nombre_editorial"
            aria-describedby="helpId"
            placeholder="Nombre"
          >
            <option
              v-for="editorial in editoriales"
              key="editorial.id"
              :value="editorial.id"
            >
              {{ editorial.nombre }}
            </option>
          </select>
          <small id="helpId" class="form-text text-muted"
            >Seleccione la Editorial</small
          >
        </div>
        <div class="btn-group" role="group" aria-label="">
          <button @click.prevent="guardarLibro" class="btn btn-danger">
            Guardar
          </button>
          <router-link :to="{ name: 'libros' }" class="btn btn-warning"
            >Cancelar</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
