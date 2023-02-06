export function VistaAlta(controlador)
{
	return VistaAlta = Vue.createApp({
		data() {
			return {
				controlador: controlador,
				clase: 'inactivo',
				nombre: '',
				fecha: '',
				precio: 0,
				descripcion: '',
				subirImagen: null,
				seguro1: false,
				seguro2: false,
				seguro3: false,
				categoria: '',
				checkboxAvisoAlta: false
			}
		},
		template:
		/*html*/
		`<div>
			<p class="pAviso"></p>
			<form id="formAlta">
				<label for="nombre">
					Nombre <input v-model="nombre" aria-label="Nombre" type="text" name="nombre"/>
				</label>
				<label for="fecha">
					Fecha <input v-model="fecha" aria-label="Fecha" type="text" title="La fecha en la que se lanzó el producto." name="fecha"/>
				</label>
				<label for="precio">
					Precio en € <input v-model="precio" aria-label="Precio" type="number" name="precio" step="0.1"/>
				</label>
				<label for="descripcion">
					Descripción <textarea v-model="descripcion" aria-label="Descripción" name="descripcion" rows="8" cols="50"></textarea>
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
					Categoría <select name="categoria" v-model="categoria">
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
					<input v-model="checkboxAvisoAlta" type="checkbox" aria-label="Checkbox privacidad" name="checkboxAvisoAlta"/>
					Acepto sin reservas la <a href="infoLegal.html">política de protección de datos personales.</a>
				</label>
				<div class="divBotonesForm">
					<button type="reset" id="botonCancelar">Cancelar</button>
					<button type="button" id="botonAceptar" @click="aceptar">Aceptar</button>
				</div>
			</form>
		</div>`,
		methods: {
			imagenChange(e) {
				let files = e.target.files || e.dataTransfer.files;
  				console.log(files);
			},
			aceptar() {
				const colorOk = '1px solid #ADACAC'; 
				const colorMal = '1px solid crimson';
		
				if(this.checkboxAviso.is(':checked'))
				{
					let cont = 0;
		
					// Validación nombre
					if (this.campoNombre.val() && this.campoNombre.val().length <= 50) {
						cont++;
						this.campoNombre.css('border', colorOk);
					}
					else {
						this.campoNombre.css('border', colorMal);
					}
		
					// Validación fecha
					if (this.campoFecha.val()) {
						cont++;
						this.campoFecha.css('border', colorOk);
					}
					else {
						this.campoFecha.css('border', colorMal);
					}
		
					// Validación precio
					if (this.campoPrecio.val() && !isNaN(this.campoPrecio.val()) && this.campoPrecio.val() > 0) {
						cont++;
						this.campoPrecio.css('border', colorOk);
					}
					else {
						this.campoPrecio.css('border', colorMal);
					}
		
					// Validación tipo
					if (this.campoTipo.val() != -1){
						cont++;
						this.campoTipo.css('border', colorOk);
					}
					else {
						this.campoTipo.css('border', colorMal);
					}
		
					// Validación descripción
					if (this.campoDescripcion.val() && this.campoDescripcion.val().length <= 500){
						cont++;
						this.campoDescripcion.css('border', colorOk);
					}
					else {
						this.campoDescripcion.css('border', colorMal);
					}
		
					// Validación imagen
					if (this.campoImagen.prop('files')[0] != null) {
						cont++;
						this.campoImagen.css('border', colorOk);
					}
					else {
						this.campoImagen.css('border', colorMal);
					}
		
					window.scrollTo(0, 0);	// Mover al top de la página.
					this.parrafoAviso.show();
		
					if(cont == 6) {
						this.parrafoAviso.text('✔️ Componente añadido correctamente ✔️');
						
						this.controlador.aceptarCRUD(
							this.campoNombre.val(), 
							this.campoFecha.val(), 
							this.campoPrecio.val(),
							this.campoDescripcion.val(), 
							this.campoTipo.val(),
							this.campoImagen.prop('files')[0], 
							this.seguro1.is(':checked'),
							this.seguro2.is(':checked'),
							this.seguro3.is(':checked')
						);
		
						this.cancelar();	// Borrar los campos una vez añadido el elemento.
					}
					else {
						this.parrafoAviso.text('⚠️ Rellena correctamente los campos indicados ⚠️');
					}
				}
				else {
					window.scrollTo(0, 0);	// Mover al top de la página.
					this.parrafoAviso.show();
					this.parrafoAviso.text('⚠️ Acepta el aviso de protección de datos para continuar ⚠️');
				}
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