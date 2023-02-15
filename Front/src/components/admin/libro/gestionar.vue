<script setup>
/**
 * Imports
 */
import { ref, onMounted } from "vue";
import { useEditorialStore, useLibroStore, useAutorStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";

/**
 * Variables
 */
let libroStore = useLibroStore();
let editorialStore = useEditorialStore();
let autorStore = useAutorStore();
let id = ref(null);
let accion = ref(null);
const route = useRoute();
const router = useRouter();
let libro = ref(null);
let autores = ref([]);
let editoriales = ref([]);

/**
 * Metodos
 */
onMounted(async () => {
  autores.value = await autorStore.consultar();
  editoriales.value = await editorialStore.consultar();
  console.log("Montado");
  id.value = route.params.id;
  console.log(id.value);
  if (id.value != null) {
    accion = "Editar";
    libro.value = await libroStore.consultarLibro(id.value);
  } else {
    accion = "Crear";
    libro.value = {
      id: 0,
      editorial_id: 0,
      autor_id: 0,
      titulo: "",
    };
  }
});

let guardarLibro = async () => {
    let result = await libroStore.guardar(libro.value);
    router.push({ name: 'libros'});
};
</script>

<template>
  <div class="container">
    <div class="card" v-if="libro">
      <div class="card-header"><h3>{{ accion }} Libro {{ libro.nombre }}</h3></div>
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
            <button @click.prevent="guardarLibro" class="btn btn-danger">
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
