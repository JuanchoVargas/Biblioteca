<script setup>
import { ref, onMounted } from "vue";
import { useAutorStore  } from "@/stores";
const autorStore = useAutorStore();
let autores = ref([]);
onMounted(async () => {
  console.log("autorStore =>", autorStore);
  autores.value = await autorStore.consultar();
});
let borrar = async (item) => {
  const confirmacion = confirm(
    `Esta seguro que desea borrar "${item.nombre}"?`
  );
  if (confirmacion) {
    let result = await autorStore.borrar(item.id);
    autorStore.limpiar();
    autores.value = await autorStore.consultar();
  }
};
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6">Autores</div>
          <div class="col-md-6 text-right">
            <router-link :to="{ name: 'autor-crear' }" class="nav-link"
              >Crear autor</router-link
            >
          </div>
        </div>
      </div>
      <div class="card-body">
        <table class="table" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="autor in autores" key="autores.id">
              <td scope="row">{{ autor.id }}</td>
              <td>{{ autor.nombre }}</td>
              <td>
                <div class="btn-group" role="group" aria-label="">
                  <router-link
                    :to="{ name: 'autor-editar', params: { id: autor.id } }"
                    class="btn btn-warning"
                    >Editar</router-link
                  >
                  <button
                    type="button"
                    @click.prevent="borrar(autor)"
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
