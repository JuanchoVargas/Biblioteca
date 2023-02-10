import { ref } from "vue";
import { defineStore } from "pinia";

export const useAutoresAPIstore = defineStore({
  /**
   * Variables
   */
  state: () => ({
    editoriales: ref([]),
    route: useRoute(),
    router: useRouter(),
    editorial: ref(null),
    id: ref(null),
  }),

  /**
   * Metodos
   */
  actions: () => ({
    consultarEditoriales: async (editoriales) => {
      axios
        .get("http://localhost:5000/api/editoriales/")
        .then((datosRespuesta) => {
          console.log(datosRespuesta.data);
          editoriales.value = datosRespuesta.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    borrarEditorial: async (editorial) => {
      const confirmacion = confirm(
        `Esta seguro que desea borrar el libro "${editorial.nombre}"?`
      );
      if (confirmacion) {
        axios
          .delete("https://localhost:5000/api/editoriales/" + editorial.id, {
            id: editorial.id,
          })
          .then((datosEliminados) => {
            consultarAutores();
            console.log(datosEliminados);
            alert("Se ha eliminado el autor");
          })
          .catch((err) => {
            console.log(err);
            alert("Se presento un error");
          });
      }
    },

    onMounted: () => {
      console.log("Montado");
      consultarEditoriales();
    },

    guardarEditorial: async (editorial) => {
      const confirmacion = confirm(
        `Esta seguro que desea actualizar el libro "${editorial.value.nombre}"?`
      );
      if (confirmacion) {
        axios
          .put("https://localhost:5000/api/editoriales/", editorial.value)
          .then((datos) => {
            console.log(datos);
            alert("Se ha actualizado el Libro");
            router.push({ name: "autores" });
          })
          .catch((err) => {
            console.log(err);
            alert("Se presento un error: " + err.message);
          });
      }
    },
  }),
});
