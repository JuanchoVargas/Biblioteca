<script setup>
/**
 * Imports
 */
import { ref, onMounted } from "vue";
import { useEditorialStore } from "@/stores";
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
const editorialStore = useEditorialStore();
let editoriales = ref([]);
/**
 * Metodos
 */
onMounted(async () => {
  console.log("editorialStore =>", editorialStore);
  editoriales.value = await editorialStore.consultar();
});

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
      <div>
        <DxDataGrid
          id="gridContainer1"
          :row-alternation-enabled="true"
          :hover-state-enabled="true"
          :word-wrap-enabled="true"
          :data-source="editoriales"
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
        </DxDataGrid>
      </div>
    </div>
  </div>
</template>
