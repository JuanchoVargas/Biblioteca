<script setup>
/**
 * Imports
 */
import { ref, onMounted } from "vue";
import { useEditorialStore } from "@/stores";

/**
 * Variables
 */
const editorialStore = useEditorialStore();
let editoriales = ref([]);

/**
 * Metodos
 */
onMounted(async () => {
  console.log("editorialStore =>", editorialStore);
  editoriales.value = await editorialStore.consultar();
});
let borrar = async (item) => {
  const confirmacion = confirm(
    `Esta seguro que desea borrar "${item.nombre}"?`
  );
  if (confirmacion) {
    let result = await editorialStore.borrar(item.id);
    editorialStore.limpiar();
    editoriales.value = await editorialStore.consultar();
  }
};
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6">Editoriales</div>
          <div class="col-md-6 text-right">
            <router-link :to="{ name: 'editorial-crear' }" class="nav-link">
              Agregar Editorial</router-link
            >
          </div>
        </div>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>ID Editorial</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="editorial in editoriales" key="editoriales.id">
              <td scope="row">{{ editorial.id }}</td>
              <td scope="row">{{ editorial.nombre }}</td>
              <td>
                <div class="btn-group" role="group" aria-label="">
                  <router-link
                    :to="{
                      name: 'editorial-editar',
                      params: { id: editorial.id },
                    }"
                    class="btn btn-warning"
                    >Editar</router-link
                  >
                  <button
                    type="button"
                    @click.prevent="borrar(editorial)"
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
