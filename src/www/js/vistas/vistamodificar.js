export function VistaModificar(controlador) {
	return VistaModificar = Vue.createApp({
		data() {
			return {
				controlador: controlador,
				mostrar: false,
				actualizar: -1,
				nuevoNombre: '',
				nuevaFecha: '',
				nuevoPrecio: 0,
				nuevaDescripcion: '',
				nuevaImagen: null,
				nuevoSeguro1: false,
				nuevoSeguro2: false,
				nuevoSeguro3: false,
				nuevaCategoria: -1,
				checkboxAlta: false,
				parrafoTexto: '',
				mostrarParrafo: false,
				componentes: null
			}
		},
		template:
		/*html*/
		`<div v-if="mostrar" id="divM">
			<p v-if="mostrarParrafo" class="pAviso">{{this.parrafoTexto}}</p>
			<form id="formModificar">
				<label for="actualizar">
					Componente 
					<select v-model="actualizar" @click="actualizarForm" ref="listado" name="actualizar">
						<option value="-1" disabled selected>-- Selecciona componente --</option>
						<option v-for="componente of componentes" :value="componente.id">{{componente.nombre}}</option>
					</select>
				</label>
				<label for="nuevoNombre">
					Nuevo nombre <input v-model="nuevoNombre" ref="nuevoNombre" type="text" aria-label="Nuevo nombre" name="nuevoNombre"/>
				</label>
				<label for="nuevaFecha">
					Nueva fecha <input v-model="nuevaFecha" ref="nuevaFecha" type="text" title="La fecha en la que se lanzó el producto." aria-label="Nueva fecha" name="nuevaFecha"/>
				</label>
				<label for="nuevoPrecio">
					Nuevo precio en € <input v-model="nuevoPrecio" ref="nuevoPrecio" type="number" aria-label="Nuevo precio" name="nuevoPrecio" step="0.1"/>
				</label>
				<label for="nuevaDescripcion">
					Nueva descripción <textarea v-model="nuevaDescripcion" ref="nuevaDescripcion" name="nuevaDescripcion" aria-label="Nueva descripción" rows="8" cols="50"></textarea>
				</label>
				<label for="nuevaImagen">
					Subir nueva imagen <input v-on:change="imagenChange" type="file" aria-label="Nueva imagen" name="nuevaImagen" accept="image/png, image/jpeg"/>
				</label>
				<fieldset>
					<legend>Seguros que tiene el producto</legend>
					<label for="nuevoSeguro1" class="labelCheckbox">
						Seguro contra robos <input v-model="nuevoSeguro1" type="checkbox" aria-label="Seguro contra robos" name="nuevoSeguro1"/>
					</label>
					<label for="nuevoSeguro2" class="labelCheckbox">
						Seguro contra roturas <input v-model="nuevoSeguro2" type="checkbox" aria-label="Seguro contra robos" name="nuevoSeguro2"/>
					</label>
					<label for="nuevoSeguro3" class="labelCheckbox">
						Seguro contra caídas <input v-model="nuevoSeguro3" type="checkbox" aria-label="Seguro contra caídas" name="nuevoSeguro3"/>
					</label>
				</fieldset>
				<label for="nuevaCategoria">
					Nueva categoría 
					<select v-model="nuevaCategoria" ref="nuevaCategoria" name="nuevaCategoria">
						<option value="-1" disabled selected>-- Selecciona --</option>
						<option value="1">CPU</option>
						<option value="2">GPU</option>
						<option value="3">RAM</option>
						<option value="4">Fuente de alimentación</option>
						<option value="5">Placa base</option>
						<option value="6">Disco duro</option>
						<option value="7">Torre</option>
						<option value="8">Otro</option>
					</select>  
				</label>
				<label for="checkboxAvisoAlta">
					<input v-model="checkboxAlta" type="checkbox" aria-label="Checkbox privacidad" name="checkboxAvisoAlta"/>
					Acepto sin reservas la <a href="infoLegal.html">política de protección de datos personales.</a>
				</label>
				<div class="divBotonesForm">
					<button type="button" @click="cancelar" id="botonBorrar">Cancelar</button>
					<button type="button" @click="aceptar" id="botonActualizar">Aceptar</button>
				</div>
			</form>
		</div>`,
		methods: {
			imagenChange(e) {
				this.nuevaImagen = e.target.files || e.dataTransfer.files;
  				console.log(this.nuevaImagen);
			},
			aceptar() {
				if(this.checkboxAlta) {
					const colorOk = '1px solid #ADACAC'; 
					const colorMal = '1px solid crimson';
					let cont = 0;
		
					// Validación listado
					if (this.actualizar != -1) {
						this.$refs.listado.style.border = colorOk;
						cont++;
					}
					else {
						this.$refs.listado.style.border = colorMal;
					}

					// Validación nombre
					if (this.nuevoNombre && this.nuevoNombre.length <= 50) {
						this.$refs.nuevoNombre.style.border = colorOk;
						cont++;
					}
					else {
						this.$refs.nuevoNombre.style.border = colorMal;
					}
		
					// Validación fecha
					if (this.nuevaFecha) {
						this.$refs.nuevaFecha.style.border = colorOk
						cont++;
					}
					else {
						this.$refs.nuevaFecha.style.border = colorMal;
					}
		
					// Validación precio
					if (this.nuevoPrecio && !isNaN(this.nuevoPrecio) && this.nuevoPrecio > 0) {
						this.$refs.nuevoPrecio.style.border = colorOk;
						cont++;
					}
					else {
						this.$refs.nuevoPrecio.style.border = colorMal;
					}
		
					// Validación tipo
					if (this.nuevaCategoria != -1) {
						this.$refs.nuevaCategoria.style.border = colorOk;
						cont++;
					}
					else {
						this.$refs.nuevaCategoria.style.border = colorMal;
					}
		
					// Validación descripción
					if (this.nuevaDescripcion && this.nuevaDescripcion.length <= 500) {
						this.$refs.nuevaDescripcion.style.border = colorOk;
						cont++;
					}
					else {
						this.$refs.nuevaDescripcion.style.border = colorMal;
					}
		
					// Validación imagen
					if (this.nuevaImagen != null) {
						cont++;
					}
					
					window.scrollTo(0, 0);	// Mover al top de la página.
					this.mostrarParrafo = true;

					if(cont == 7) {
						this.parrafoTexto = '✔️ Componente modificado correctamente ✔️';
						
						this.controlador.actualizarCRUD(
							this.actualizar,
							this.nuevoNombre, 
							this.nuevaFecha, 
							this.nuevoPrecio,
							this.nuevaDescripcion, 
							this.nuevaCategoria,
							this.nuevaImagen[0], 
							this.nuevoSeguro1,
							this.nuevoSeguro2,
							this.nuevoSeguro3
						);
		
						this.cancelar();	// Borrar los campos una vez añadido el elemento.
					}
					else {
						this.parrafoTexto = '⚠️ Rellena correctamente todos los campos ⚠️';
					}
				}
				else {
					window.scrollTo(0, 0);	// Mover al top de la página.
					this.mostrarParrafo = true;
					this.parrafoTexto = '⚠️ Acepta el aviso de protección de datos para continuar ⚠️';
				}
			},
			cancelar() {
				this.nuevoNombre = ''; 
				this.nuevaFecha = '';
				this.nuevoPrecio = 0;
				this.nuevaDescripcion = ''; 
				this.nuevaCategoria = -1;
				this.nuevaImagen = null; 
				this.nuevoSeguro1 = false;
				this.nuevoSeguro2 = false;
				this.nuevoSeguro3 = false;
				this.checkboxAlta = false;
			},
			actualizarForm() {
				let componentes = this.controlador.modelo.getLista();
				let dato = null;
				
				if(componentes != null) {
					for(let componente of componentes) {
						if(componente.id == this.actualizar) {
							dato = componente;
							break;
						}
					}

					if(dato != null) {
						this.nuevoNombre = dato.nombre;
						this.nuevaFecha = dato.fecha;
						this.nuevoPrecio = dato.precio;
						this.nuevaDescripcion = dato.descripcion;
						this.nuevaCategoria = dato.tipo;
						this.nuevoSeguro1 = dato.seguro1;
						this.nuevoSeguro2 = dato.seguro2;
						this.nuevoSeguro3 = dato.seguro3;
					}
				}
			}
		}
	});
}