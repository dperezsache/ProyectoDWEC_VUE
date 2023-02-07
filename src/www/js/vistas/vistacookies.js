/**
	Vista de la barra de búsqueda.
	Contiene todos los componentes que hayan.
**/
export function VistaCookies(controlador) {
	return VistaCookies = Vue.createApp({
		data() {
			return {
				controlador: controlador,
				mostrar: false
			}
		},
		template:
		/*html*/
		`<div v-if="mostrar" class="cookieContainer">
			<div class="cookieSubcontainer">
				<div class="cookies">
					<p>
						Utilizamos cookies para habilitar el funcionamiento y la seguridad adecuados de nuestro sitio web, 
						y para ayudarnos a ofrecerte la mejor experiencia de usuario posible. Al hacer clic en Aceptar, 
						aceptas el uso de estas cookies. Puedes cambiar la configuración de las cookies en cualquier momento.
						<a href="assets/politicaCookies.pdf">Más información.</a>
					</p>
					<div>
						<button class="buttonCookie" @click="cancelar">Rechazar</button>
						<button class="buttonCookie" @click="aceptar">Aceptar</button>
					</div>
				</div>
			</div>
		</div>`,
		methods: {
			/**
			 * Ocultar el aviso de cookies.
			 */
			cancelar() {
				this.mostrar = false;
			},

			/**
			 * Aceptar las cookies.
			 */
			aceptar() {
				this.mostrar = false;
				this.controlador.crearCookie1();
			}
		}
	});
}