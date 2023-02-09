/**
	Vista de la barra de búsqueda.
	Contiene todos los componentes que hayan.
**/
export function VistaBarraBusqueda(controlador) {
	return VistaBarraBusqueda = Vue.createApp({
		data() {
			return {
				controlador: controlador,
				mostrar: false,
				campoBuscar: ''
			}
		},
		template:
		/*html*/
		`<div v-if="mostrar">
			<label id="labelBuscar" for="buscar">
				Búsqueda<br/> 
				<input id="buscar" v-model="campoBuscar" role="searchbox" aria-label="Búsqueda" name="buscar" type="text" maxlength="50"/>
			</label>
			<button type="button" class="boton" @click="busqueda">
				<span class="material-icons" role="img" aria-label="Buscar">search</span>
			</button>
		</div>`,
		methods: {
			/**
			 * Realiza búsqueda de componentes
			 */
			busqueda() {
				this.controlador.buscarComponentes(this.campoBuscar);
			},
			/**
			 * Mostrar/ocultar la vista.
			 * @param {Boolean} visible True mostrar, false ocultar.
			 */
			mostrarVista(visible) {
				this.mostrar = visible;
			}
		}
	});
}