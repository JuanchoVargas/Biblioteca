<script setup>
import { ref, onMounted } from "vue";
import { useAutorStore  } from "@/stores";
import { useRoute, useRouter } from "vue-router";
const autorStore = useAutorStore();

let accion = ref(null);
let id = ref(null);
const route = useRoute();
const router = useRouter();
let autor = ref(null);

onMounted(async () => {
  console.log("Montado");
  id.value = route.params.id;
  console.log(id.value);  
  if (id.value != null){
    accion = "Editar";
    autor.value = await autorStore.consultarAutor(id.value);
  } else {
    accion = "Crear";
    autor.value ={
      id:0,
      nombre:  ""
    }
  }
});

let guardarAutor = async () => {
    let result = await autorStore.guardar(autor.value);
    router.push({ name: 'autores'});
};
</script>

<template>
  <div class="container">
    <div class="card" v-if="autor">
      <div class="card-header"><h3>{{ accion }} Autor {{ autor.nombre }}</h3></div>
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
