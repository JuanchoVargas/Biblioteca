
<script setup>
/**
 * Imports
 */
import axios from 'axios';
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';

/**
 * Variables
 */
const router = useRouter();
let editorial = ref({id:0, nombre:""});

let actualizarEditorial= async () => {
  const confirmacion = confirm(`Esta seguro que desea guardar el autor "${editorial.value.nombre}"?`);
    if (confirmacion) {
      axios
        .post("https://localhost:5000/api/editoriales", editorial.value)
        .then((datos) => {
          console.log(datos);
          alert('Se ha creado la Editorial');
          router.push({ name: 'editoriales'});
        })
        .catch((err) => {
          console.log("El error =>", err);
          alert('Se presento un error: '+ err.response.data);
        });
    }
};

onMounted(() => {
});

</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Crear una Nueva Editorial: {{ editorial }}</div>
      <div class="card-body">
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
              >Escribe el nombre de la Editorial</small
            >
          </div>
          <div class="btn-group" role="group" aria-label="">
            <button :disabled="editorial.nombre.length < 4" @click.prevent="actualizarEditorial" class="btn btn-danger">Guardar</button>
            <router-link :to="{ name: 'editoriales' }" class="btn btn-warning">Cancelar</router-link>
          </div>
      </div>
    </div>
  </div>
</template>

