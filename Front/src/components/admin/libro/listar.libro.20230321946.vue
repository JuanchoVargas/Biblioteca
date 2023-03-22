<script setup>
/**
 * Imports
 */
import { ref, onMounted } from "vue";
import { useLibroStore } from "@/stores";
/**
 * Variables
 */
const libroStore = useLibroStore();
let libros = ref([]);
/**
 * Metodos
 */
onMounted(async () => {
  console.log("libroStore =>", libroStore);
  libros.value = await libroStore.consultar();
});
let borrar = async (item) => {
  const confirmacion = confirm(
    `Esta seguro que desea borrar "${item.nombre}"?`
  );
  if (confirmacion) {
    let result = await libroStore.borrar(item.id);
    libroStore.limpiar();
    libros.value = await libroStore.consultar();
  }
};

</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6">Libros</div>
          <div class="col-md-6 text-right">
            <router-link :to="{ name: 'libro-crear' }" class="nav-link">
              Agregar Libro</router-link
            >
          </div>
        </div>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>ID Libro</th>
              <th>Nombre</th>
              <th>Autor</th>
              <th>Editorial</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="libro in libros" key="libros.id">
              <td scope="row">{{ libro.id }}</td>
              <td>{{ libro.titulo }}</td>
              <td>{{ libro.autor_id }}</td>
              <td>{{ libro.editorial_id }}</td>
              <td>
                <div class="btn-group" role="group" aria-label="">
                  <router-link
                    :to="{ name: 'libro-editar', params: { id: libro.id } }"
                    class="btn btn-warning"
                    >Editar</router-link
                  >
                  <button
                    type="button"
                    @click.prevent="borrar(libro)"
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
