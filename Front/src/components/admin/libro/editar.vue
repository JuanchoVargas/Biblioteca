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
let libros = ref([]);
let id = ref(null);
const route = useRoute();
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
  id.value = route.params.id;
  console.log(id.value);
  consultarLibro(id.value);
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

let consultarLibro = async (id) => {
  axios
    .get("https://localhost:5000/api/libros")
    .then((datosRespuesta) => {
      console.log(datosRespuesta.data);
      libros.value = datosRespuesta.data;
      libro.value = libros.value.find((o) => o.id == id);
    })
    .catch((err) => {
      console.log(err);
    });
};

let editarLibro = async () => {
  const confirmacion = confirm(
    `Esta seguro que desea actualizar el libro "${libro.value.titulo}"?`
  );
  if (confirmacion) {
    axios
      .put("https://localhost:5000/api/libros/" + libro.value.id, libro.value)
      .then((datos) => {
        console.log(datos);
        alert("Se ha actualizado el Libro");
        router.push({ name: "libros" });
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
    <div class="card" v-if="libro">
      <div class="card-header">Editar Libro: {{ libro }}</div>
      <div class="card-body">
        <form v-on:submit.prevent="actualizarRegistro">
          <div class="form-group">
            <label for="nombre">Titulo:</label>
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
              >Escriba el nombre del Libro</small
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
              <option
                v-for="autor in autores"
                key="autores.id"
                :value="autor.id"
              >
                {{ autor.nombre }}
              </option>
            </select>
            <small id="helpId" class="form-text text-muted"
              >Seleccione el nombre del Autor</small
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
                key="autores.id"
                :value="editorial.id"
              >
                {{ editorial.nombre }}
              </option>
            </select>
            <small id="helpId" class="form-text text-muted"
              >Seleccione el nombre de la Editorial</small
            >
          </div>

          <div class="btn-group" role="group" aria-label="">
            <button @click.prevent="editarLibro" class="btn btn-danger">
              Guardar
            </button>
            <router-link :to="{ name: 'libros' }" class="btn btn-warning"
              >Cancelar</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
