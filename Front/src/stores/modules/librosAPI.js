import { ref } from "vue";
import { defineStore } from "pinia";

export const useAutoresAPIstore = defineStore({
  /**
   * Variables
   */
  state: () => ({
    libros: ref([]),
    libro: ref({
      id: 0,
      editorial_id: 0,
      autor_id: 0,
      titulo: "",
    }),
    route: useRoute(),
    router: useRouter(),
    editorial: ref(null),
    id: ref(null),
  }),

  /**
   * Metodos
   */
  actions: () => ({
    consultarLibros: async (editoriales) => {
      axios
        .get("http://localhost:5000/api/libros/")
        .then((datosRespuesta) => {
          console.log(datosRespuesta.data);
          editoriales.value = datosRespuesta.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    borrarLibro : async (libro) => {
      const confirmacion = confirm(
        `Esta seguro que desea borrar el libro "${libro.titulo}"?`
      );
      if (confirmacion) {
        axios
          .delete("https://localhost:5000/api/libros/" + libro.id, {
            id: libros.id,
          })
          .then((datosEliminados) => {
            consultarLibros();
            console.log(datosEliminados);
            alert("Se ha eliminado el Libro");
          })
          .catch((err) => {
            console.log(err);
            alert("Se presento un error");
          });
      }
    },

    consultarLibro : async (id) => {
      axios
        .get("https://localhost:5000/api/libros")
        .then((datosRespuesta) => {
          console.log(datosRespuesta.data);
          libros.value = datosRespuesta.data;
          libro.value = libros.value.find((o) => o.id == id);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editarLibro : async () => {
      const confirmacion = confirm(
        `Esta seguro que desea actualizar el libro "${libro.value.titulo}"?`
      );
      if (confirmacion) {
        axios
          .put("https://localhost:5000/api/libros/" + libro.value.id, libro.value)
          .then((datos) => {
            console.log(datos);
            alert("Se ha actualizado el Libro");
            router.push({ name: "libros" });
          })
          .catch((err) => {
            console.log(err);
            alert("Se presento un error: " + err.message);
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

    guardarLibro : async () => {
      const confirmacion = confirm(
        `Esta seguro que desea guardar el Libro "${libro.value.titulo}"?`
      );
      if (confirmacion) {
        axios
          .post("https://localhost:5000/api/libros", libro.value)
          .then((datos) => {
            console.log(datos);
            alert("Se ha creado el Libro");
            router.push({ name: "libros" });
          })
          .catch((err) => {
            console.log("El error =>", err);
            alert("Se presento un error: " + err.response.data);
          });
      }
    }
  }),
});
