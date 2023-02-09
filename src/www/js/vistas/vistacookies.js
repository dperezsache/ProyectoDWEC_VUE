/**
	Vista del aviso de cookies.
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
						<a href="assets/politicaCookies.pdf" target="_blank">Más información.</a>
					</p>
					<div>
						<button class="buttonCookie" @click="mostrarVista(false)">Rechazar</button>
						<button class="buttonCookie" @click="aceptar">Aceptar</button>
					</div>
				</div>
			</div>
		</div>`,
		methods: {
			/**
			 * Aceptar las cookies.
			 */
			aceptar() {
				this.mostrarVista(false);
				this.controlador.crearCookie1();
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