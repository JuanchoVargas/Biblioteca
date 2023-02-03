import { ref } from "vue";
import { defineStore } from "pinia";

export const useAutoresAPIstore = defineStore({
  state: () => ({
    autores: ref([])
  })
});
