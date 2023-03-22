<script setup>
/**
 * Imports
 */
import { ref, onMounted } from "vue";
import { useAutorStore } from "@/stores";
import {
  DxColumn,
  DxDataGrid,
  DxExport,
  DxFilterRow,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
  DxScrolling,
} from "devextreme-vue/data-grid";

/**
 * Variables
 */
const autorStore = useAutorStore();
let autores = ref([]);

const paging = {
  enabled: true,
};
const pageSize = 10;
const pager = {
  showPageSizeSelector: true,
  allowedPageSizes: [5, 10, 20],
  showInfo: true,
};
const loadPanel = {
  enabled: true,
};
const selectionMode = "single";
/**
 * Metodos
 */
onMounted(async () => {
  console.log("autorStore =>", autorStore);
  autores.value = await autorStore.consultar();
});

// let borrar = async (item) => {
//   const confirmacion = confirm(
//     `Esta seguro que desea borrar "${item.nombre}"?`
//   );
//   if (confirmacion) {
//     let result = await autorStore.borrar(item.id);
//     autorStore.limpiar();
//     autores.value = await autorStore.consultar();
//   }
// };
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
      <div>
        <DxDataGrid
          id="gridContainer1"
          :row-alternation-enabled="true"
          :hover-state-enabled="true"
          :word-wrap-enabled="true"
          :data-source="autores"
          key-expr="id"
          :show-borders="true"
        >
          <DxPaging :page-size="10" />
          <DxExport :enabled="true" />
          <DxFilterRow :visible="true" />
          <DxGrouping :auto-expand-all="true" />
          <DxGroupPanel :visible="true" :allow-column-dragging="true" />
          <DxScrolling row-rendering-mode="virtual" />
          <DxPager
            :allowed-page-sizes="[10, 20, 50]"
            :display-mode="full"
            :show-info="true"
            :show-navigation-buttons="true"
            :show-page-size-selector="true"
            :visible="true"
          />
          <DxColumn data-field="id" caption="Id" :width="150" />
          <DxColumn data-field="nombre" caption="Autor" />
          
          <!-- <div class="btn-group" role="group" aria-label="">
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
          </div> -->
          <!-- <DxColumn :width="60" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editable" />
				<template #tpl="{ data }">
					<a href="#" @click.prevent="modal(true, data.data.observacion)" class="cmd-item color-main-600" title="Editar comentario..."
						><i class="fa-solid fa-pen-to-square"></i
					></a>
				</template>
				<DxSummary>
					<DxGroupItem column="indicador" summary-type="count" display-format="{0} indicadores" />
				</DxSummary> -->
        </DxDataGrid>
      </div>
      <!-- <div class="row">
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
			</div> -->
    </div>
  </div>
</template>
