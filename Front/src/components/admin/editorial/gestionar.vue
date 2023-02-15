<script setup>
/**
 * Imports
 */
import { ref, onMounted } from "vue";
import { useEditorialStore  } from "@/stores";
import { useRoute, useRouter } from "vue-router";

/**
 * Variables
 */
const editorialStore = useEditorialStore();
let accion = ref(null);
let id = ref(null);
const route = useRoute();
const router = useRouter();
let editorial = ref(null);


/**
 * Metodos
 */
onMounted(async () => {
  console.log("Montado");
  id.value = route.params.id;
  console.log(id.value);  
  if (id.value != null){
    accion = "Editar";
    editorial.value = await editorialStore.consultarEditorial(id.value);
  } else {
    accion = "Crear";
    editorial.value ={
      id:0,
      nombre:  ""
    }
  }
});

let guardarEditorial = async () => {
    let result = await editorialStore.guardar(editorial.value);
    router.push({ name: 'editoriales'});
};
</script>

<template>
  <div class="container">
    <div class="card" v-if="editorial">
      <div class="card-header"><h3>{{ accion }} Editorial {{ editorial.nombre }}</h3></div>
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
              @click.prevent="guardarEditorial"
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
