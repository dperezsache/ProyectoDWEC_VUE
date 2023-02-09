/**
	Implementa una vista del listado de productos.
**/
export function VistaListado(controlador) {
	return VistaListado = Vue.createApp({
		data() {
			return {
				controlador: controlador,
				datos: {type: Array,},
				mostrar: false
			}
		},
		template:
		/*html*/
		`<div id="divL" v-if="mostrar">
			<p v-if="!datos.length" class="pAviso">No hay ningún registro.</p>
			<div class="divItem" role="listitem" v-for="dato in datos">
				<img class="imgComponente" draggable="false" :src="dato.imagen" :alt="dato.nombre"/>
				<p class="pNombreItem" tabIndex="0">{{dato.nombre}}</p>
				<p class="pPrecioItem" tabIndex="0">{{this.formatearPrecio(dato.precio)}}€</p>
				<div class="divDescItem">
					<p tabIndex="0">{{dato.descripcion}}</p>
				</div>
				<ul>
					<li>Tipo de producto: <span class="spanFecha">{{this.tipoProducto(dato.tipo)}}</span></li>
					<li>Fecha de lanzamiento: <span class="spanFecha">{{dato.fecha}}</span></li>
				</ul>
				<hr class="hrItems"/>
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
					<button class="boton" @click="eliminar(dato.id)" style="margin-right: 10px;">
						<span class="material-icons" role="img" aria-label="Eliminar" tabIndex="0">delete</span>
					</button>
					<button class="boton" @click="editar(dato.id)">
						<span class="material-icons" role="img" aria-label="Editar" tabIndex="0">edit</span>
					</button>
				</div>
			</div>
		</div>`,
		methods: {
			/**
			 *	Atención al evento eliminar de una fila.
			 *	@param {Number} id ID del dato a eliminar.
			 */
			eliminar(id) {
				this.controlador.eliminarCRUD(id);
			},
			/**
			 *	Atención al evento editar una fila.
			 *	@param {Number} id ID del dato a editar.
			 */
			editar(id) {
				this.controlador.editarCRUD(id);
			},
			/**
			 *	Devuelve el tipo de elemento correspondiente.
			 *	@param {Number} tipo ID del tipo de componente.
			 *	@returns {String} Nombre del tipo de componente.
			 */
			tipoProducto(tipo) {
				switch(parseInt(tipo)) {
					case 1: 
						return 'Procesador';
					case 2: 
						return 'Tarjeta gráfica';
					case 3: 
						return 'Memoria RAM';
					case 4: 
						return 'Fuente de alimentación';
					case 5: 
						return 'Placa base';
					case 6: 
						return 'Disco duro';
					case 7: 
						return 'Torre';
					case 8: 
						return 'Otro';
					default: 
						return '';
				}
			},
			/**
			 * Formatea el precio del componente.
			 * @param {Number} precio Precio del componente.
			 * @returns {Number} Precio formateado.
			 */
			formatearPrecio(precio) {
				precio = parseFloat(precio).toFixed(2);
				precio = precio.replace('.', ',');
				return precio;
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