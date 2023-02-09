/**
	Vista del footer.
**/
export function VistaFooter(controlador) {
	return VistaFooter = Vue.createApp({
		data() {
			return {
				controlador: controlador,
                mostrarTiempo: false,
                mostrarConfCookies: false,
                cookiesPulsadas: false,
                datosTiempo: ''
			}
		},
		template:
		/*html*/
		`<div id="divFooter">
            <img id="imgFooter" src="../../diseno/logo-icono.png" alt="Logo de CoolPC"/>
            <p>
                <a href="https://achecker.achecks.ca/checker/index.php?uri=referer&gid=WCAG2-AA">
                    <img id="imgAChecker" src="assets/icon_W2_aa.jpg" alt="WCAG 2.0 (Level AA)" tabindex="0" role="link"/>
                </a>
            </p>

            <p id="pLegalidad">
                <a href="infoLegal.html">Avisos legales / Protección de datos personales / Aviso de propiedad intelectual / Política de cookies</a>
                <button type="button" class="boton" id="buttonCookies" @click="toggleConfCookies">Gestionar cookies</button>
            </p>
            <div v-if="mostrarConfCookies" id="divConfCookies">
                <label for="checkboxCookie">
                    <input v-model="cookiesPulsadas" type="checkbox" name="checkboxCookie" @click="permitirCookies"/> Permitir el uso de cookies (deshabilita o habilita las demás).
                </label>
            </div>
            <button type="button" class="boton" id="buttonTiempo" @click="toggleTiempo">Mostrar/ocultar predicción meteorológica</button>
            <p v-if="mostrarTiempo" id="pTiempo">{{datosTiempo}}</p>
        </div>`,
        methods: {
            /**
             * Muestra/oculta la información del tiempo.
             */
            toggleTiempo() {
                this.mostrarTiempo = !this.mostrarTiempo;
            },
            /**
             * Muestra/oculta la configuración de las cookies.
             */
            toggleConfCookies() {
                this.mostrarConfCookies = !this.mostrarConfCookies;
            },
            /**
             * Habilita o no el uso de cookies.
             */
            permitirCookies() {
                this.cookiesPulsadas = !this.cookiesPulsadas;
                this.controlador.configuracionCookies(this.cookiesPulsadas);
            }
        }
	});
}