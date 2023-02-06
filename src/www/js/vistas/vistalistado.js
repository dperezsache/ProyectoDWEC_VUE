/**
	Implementa una vista del listado de productos.
**/
export function VistaListado(controlador) {
	return VistaListado = Vue.createApp({
		data() {
			return {
				controlador: controlador,
				datos: {type: Array},
				mostrar: false
			}
		},
		template:
		/*html*/
		`<div v-if="mostrar">
			<!--<p class="pAviso">No hay ningún registro.</p>-->
			<div class="divItem" role="listitem" v-for="dato in datos">
				<img style="width: 256px; height: 256px; display: block;" :src="dato.imagen" :alt="dato.nombre"/>
				<p class="pNombreItem" tabIndex="0">{{dato.nombre}}</p>
				<p class="pPrecioItem" tabIndex="0">{{dato.precio}}€</p>
				<div class="divDescItem">
					<p tabIndex="0">{{dato.descripcion}}</p>
				</div>
				<ul>
					<li>Tipo de producto: <span class="spanFecha">{{this.tipoProducto(dato.tipo)}}</span></li>
					<li>Fecha de lanzamiento: <span class="spanFecha">{{dato.fecha}}</span></li>
				</ul>
				<hr class="hrItems" style="width: 350px;"/>
				<ul>
					<li tabIndex="0">
						<p v-if="dato.seguro1">Se ofrece seguro contra robos.</p>
						<p v-else>No se ofrece seguro contra robos.</p>
					</li>
					<li tabIndex="0">
						<p v-if="dato.seguro2">Se ofrece seguro contra roturas.</p>
						<p v-else>No se ofrece seguro contra rotuas.</p>
					</li>
					<li tabIndex="0">
						<p v-if="dato.seguro3">Se ofrece seguro contra caídas.</p>
						<p v-else>No se ofrece seguro contra caídas.</p>
					</li>
				</ul>
				<div>
					<button class="boton" style="margin-right: 10px;">
						<span @click="eliminar(dato.id)" class="ui-icon ui-icon-trash" role="img" aria-label="Eliminar" tabIndex="0"></span>
					</button>
					<button class="boton">
						<span @click="editar(dato.id)" class="ui-icon ui-icon-pencil" role="img" aria-label="Editar" tabIndex="0"></span>
					</button>
				</div>
			</div>
		</div>`,
		methods: {
			eliminar(id) {
				this.controlador.eliminarCRUD(id);
			},
			editar(id) {
				this.controlador.editarCRUD(id);
			},
			tipoProducto(tipo) {
				switch(parseInt(tipo)) {
					case 1: return 'Procesador';
					case 2: return 'Tarjeta gráfica';
					case 3: return 'Memoria RAM';
					case 4: return 'Fuente de alimentación';
					case 5: return 'Placa base';
					case 6: return 'Disco duro';
					case 7: return 'Torre';
					case 8: return 'Otro';
					default: return '';		
				}
			}
		}
	});
}