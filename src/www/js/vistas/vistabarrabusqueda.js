/**
	Vista de la barra de búsqueda.
	Contiene todos los componentes que hayan.
**/
export function VistaBarraBusqueda(controlador)
{
	return VistaBarraBusqueda = Vue.createApp({
		data() {
			return {
				controlador: controlador,
				clase: 'inactivo',
				campoBuscar: ''
			}
		},
		template:
		/*html*/
		`<div>
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
				Realiza búsqueda de componentes
			**/
			busqueda() {
				this.controlador.buscarComponentes(this.campoBuscar);
			},
			/**
			 * Muestra/oculta vista
			 */
			mostrar(activo) {
				if (activo) this.clase = 'activo';
				else this.clase = 'inactivo';
			}
		}
	});
}