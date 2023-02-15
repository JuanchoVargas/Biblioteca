import axios from "axios";
import { defineStore } from "pinia";
let baseUrl = "http://localhost:5000/";
export const useEditorialStore = defineStore({
	id: "editorial",
	
	state: () => ({
		editoriales: [],
	}),

	actions: {
		limpiar() {
			this.editoriales = [];
		},
		async consultar() {
			console.log("state.editoriales	 =>", this.editoriales);
			if (this.editoriales.length > 0) {
				return this.editoriales;
			} else {
				return await axios.get(baseUrl + "api/editoriales").then((datosRespuesta) => {
					console.log(datosRespuesta.data);
					this.editoriales = datosRespuesta.data;
					return this.editoriales;
				});
			}
		},

		async consultarEditorial(id) {
			await this.consultar();
			let editorial = this.editoriales.find((o) => o.id == id);
			return editorial;
		},

		async guardar(id) {
			return await axios.put(baseUrl + "api/editoriales/"+ id).then((datos) => {
				this.limpiar();
				return datos;
			});
		},

		async borrar(id) {
			return await axios.delete(baseUrl + "api/editoriales/" + id).then((datos) => {
				this.limpiar();
				return datos;
			});
		},
	},
	persist: true,
});
