import axios from "axios";
import { defineStore } from "pinia";
let baseUrl = "http://localhost:5000/";
export const useLibroStore = defineStore({
	id: "libro",
	
	state: () => ({
		libros: [],
	}),

	actions: {
		limpiar() {
			this.libros = [];
		},
		async consultar() {
			console.log("state.libros	 =>", this.libros);
			if (this.libros.length > 0) {
				return this.libros;
			} else {
				return await axios.get(baseUrl + "api/libros").then((datosRespuesta) => {
					console.log(datosRespuesta.data);
					this.libros = datosRespuesta.data;
					return this.libros;
				});
			}
		},

		async consultarLibro(id) {
			await this.consultar();
			let libro = this.libros.find((o) => o.id == id);
			return libro;
		},

		async guardar(id) {
			return await axios.put(baseUrl + "api/libros/"+ id).then((datos) => {
				this.limpiar();
				return datos;
			});
		},

		async borrar(id) {
			return await axios.delete(baseUrl + "api/libros/" + id).then((datos) => {
				this.limpiar();
				return datos;
			});
		},
	},
	persist: true,
});
