export function VistaAlta(controlador) {
	return VistaAlta = Vue.createApp({
		data() {
			return {
				controlador: controlador,
				mostrar: false,
				nombre: '',
				fecha: '',
				precio: 0,
				descripcion: '',
				subirImagen: null,
				seguro1: false,
				seguro2: false,
				seguro3: false,
				categoria: -1,
				checkboxAlta: false,
				subirImagen: null,
				parrafoTexto: '',
				mostrarParrafo: false
			}
		},
		template:
		/*html*/
		`<div id="divA" v-if="mostrar">
			<p v-if="mostrarParrafo" class="pAviso">{{this.parrafoTexto}}</p>
			<form id="formAlta">
				<label for="nombre">
					Nombre <input v-model="nombre" ref="nombre" aria-label="Nombre" type="text" name="nombre"/>
				</label>
				<label for="fecha">
					Fecha <input v-model="fecha" ref="fecha" aria-label="Fecha" type="date" title="La fecha en la que se lanzó el producto." name="fecha"/>
				</label>
				<label for="precio">
					Precio en € <input v-model="precio" ref="precio" aria-label="Precio" type="number" name="precio" step="0.1"/>
				</label>
				<label for="descripcion">
					Descripción <textarea v-model="descripcion" ref="descripcion" aria-label="Descripción" name="descripcion" rows="8" cols="50"></textarea>
				</label>
				<label for="subirImagen">
					Subir imagen <input v-on:change="imagenChange" type="file" aria-label="Imagen" name="subirImagen" accept="image/png, image/jpeg"/>
				</label>
				<fieldset>
					<legend>Seguros que tiene el producto</legend>
					<label for="seguro1" class="labelCheckbox">
						Seguro contra robos <input v-model="seguro1" type="checkbox" aria-label="Seguro contra robos" name="seguro1"/>
					</label>
					<label for="seguro2" class="labelCheckbox">
						Seguro contra roturas <input v-model="seguro2" type="checkbox" aria-label="Seguro contra roturas" name="seguro2"/>
					</label>
					<label for="seguro3" class="labelCheckbox">
						Seguro contra caídas <input v-model="seguro3" type="checkbox" aria-label="Seguro contra caídas" name="seguro3"/>
					</label>
				</fieldset>
				<label for="categoria">
					Categoría 
					<select name="categoria" v-model="categoria" ref="categoria">
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
					<button type="button" id="botonCancelar" @click="cancelar">Cancelar</button>
					<button type="button" id="botonAceptar" @click="aceptar">Aceptar</button>
				</div>
			</form>
		</div>`,
		methods: {
			imagenChange(e) {
				this.subirImagen = e.target.files || e.dataTransfer.files;
  				console.log(this.subirImagen);
			},
			aceptar() {
				if(this.checkboxAlta) {
					const colorOk = '1px solid #ADACAC'; 
					const colorMal = '1px solid crimson';
					let cont = 0;
		
					// Validación nombre
					if (this.nombre && this.nombre.length <= 50) {
						this.$refs.nombre.style.border = colorOk;
						cont++;
					}
					else {
						this.$refs.nombre.style.border = colorMal;
					}
		
					// Validación fecha
					if (this.fecha) {
						this.$refs.fecha.style.border = colorOk;
						cont++;
					}
					else {
						this.$refs.fecha.style.border = colorMal;
					}
		
					// Validación precio
					if (this.precio && !isNaN(this.precio) && this.precio > 0) {
						this.$refs.precio.style.border = colorOk;
						cont++;
					}
					else {
						this.$refs.precio.style.border = colorMal;
					}
		
					// Validación tipo
					if (this.categoria != -1){
						this.$refs.categoria.style.border = colorOk;
						cont++;
					}
					else {
						this.$refs.categoria.style.border = colorMal;
					}
		
					// Validación descripción
					if (this.descripcion && this.descripcion.length <= 500){
						this.$refs.descripcion.style.border = colorOk;
						cont++;
					}
					else {
						this.$refs.descripcion.style.border = colorMal;
					}
		
					// Validación imagen
					if (this.subirImagen != null) {
						cont++;
					}
					
					window.scrollTo(0, 0);	// Mover al top de la página.
					this.mostrarParrafo = true;

					if(cont == 6) {
						this.parrafoTexto = '✔️ Componente añadido correctamente ✔️';
						
						this.controlador.aceptarCRUD(
							this.nombre, 
							this.fecha, 
							this.precio,
							this.descripcion, 
							this.categoria,
							this.subirImagen[0], 
							this.seguro1,
							this.seguro2,
							this.seguro3
						);
		
						this.cancelar();	// Borrar los campos una vez añadido el elemento.
					}
					else {
						this.parrafoTexto = '⚠️ Rellena correctamente todos los campos ⚠️';
					}
				}
				else {
					window.scrollTo(0, 0);	// Mover al top de la página.
					this.parrafoTexto = '⚠️ Acepta el aviso de protección de datos para continuar ⚠️';
				}
			},
			cancelar() {
				this.nombre = ''; 
				this.fecha = '';
				this.precio = 0;
				this.descripcion = ''; 
				this.categoria = -1;
				this.subirImagen = null; 
				this.seguro1 = false;
				this.seguro2 = false;
				this.seguro3 = false;
				this.checkboxAlta = false;
			}
		}
	});
}