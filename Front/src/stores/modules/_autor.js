import axios from "axios";
import { defineStore } from "pinia";
let baseUrl = "http://localhost:5000/";
export const useAutorStore = defineStore({
	id: "autor",
	state: () => ({
		autores: [],
	}),
	actions: {
		limpiar() {
			this.autores = [];
		},

		async consultar() {
			console.log("state.autores =>", this.autores);
			// consultarAutores:async () => {
			if (this.autores.length > 0) {
				return this.autores;
			} else {
				return await axios.get(baseUrl + "api/autores").then((datosRespuesta) => {
					console.log(datosRespuesta.data);
					this.autores = datosRespuesta.data;
					return this.autores;
				});
			}
		},

		async consultarAutor(id) {
			await this.consultar();
			let autor = this.autores.find((o) => o.id == id);
			return autor;
		},

		async guardar(autor) {
			return await axios.put(baseUrl + "api/autores", autor).then((datos) => {
				this.limpiar();
				return datos;
			});
		},

		async borrar(id) {
			return await axios.delete(baseUrl + "api/autores/" + id).then((datos) => {
				this.limpiar();
				return datos;
			});
		},
	},
	persist: true,
});
