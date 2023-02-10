import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
let baseUrl = "http://localhost:5000/";

export const useAutorStore = defineStore({
  state: () => ({
    autores: [],
    autor : null,
    id : null
  }),

  /**
   * Metodos
   */
  actions:()=> ({
    limpiar: () => {
      this.autores = [];
    },
    async todos() {
			if (this.tipos.length <= 0) {
				this.tipos = await api()
					.get("clasificador/tipos")
					.then((r) => {
						console.log("r =>", r);
						return r.data;
					});
				return this.items;
			} else return this.items;
		},
    async consultarAutores () {
    // consultarAutores:async () => {
      if (this.autores.lenght > 0){
        return this.autores;
      } else {
        this.autores = axios.get(baseUrl+"api/autores").then((datosRespuesta) => {
          console.log(datosRespuesta.data);
          return datosRespuesta.data;
        });
        return this.autores;
      }
    },

    borrarAutor : async (autor) => {
      const confirmacion = confirm(
        `Esta seguro que desea borrar el autor "${autor.nombre}"?`
      );
      if (confirmacion) {
        axios
          .delete("https://localhost:5000/api/autores/" + autor.id, {
            id: autores.id
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


    onMounted2:(() => {
      console.log("Montado");
      id.value = route.params.id;
      console.log(id.value);
      consultarLibro(id.value);
      consultarAutores();
      consultarEditoriales();
    }),

    guardarAutor : async () => {
      const confirmacion = confirm(
        `Esta seguro que desea actualizar el autor "${autor.value.nombre}"?`
      );
      if (confirmacion) {
        axios
          .put("https://localhost:5000/api/autores/", autor.value)
          .then((datos) => {
            console.log(datos);
            alert("Se ha actualizado el autor");
            router.push({ name: 'autores'});
          })
          .catch((err) => {
            console.log(err);
            alert("Se presento un error: " + err.message);
          });
      }
    },
    
  })
});
