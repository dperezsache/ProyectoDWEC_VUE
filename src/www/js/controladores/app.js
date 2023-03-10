import { Modelo } from "../modelos/modelo.js";
import { VistaAlta } from "../vistas/vistaalta.js";
import { VistaDivBotones } from "../vistas/vistadivbotones.js";
import { VistaCookies } from "../vistas/vistacookies.js";
import { VistaListado } from "../vistas/vistalistado.js";
import { VistaModificar } from "../vistas/vistamodificar.js";
import { VistaBarraBusqueda } from "../vistas/vistabarrabusqueda.js";
import { VistaFooter } from "../vistas/vistafooter.js";

class Controlador {
    /**
	 *	Constructor de la clase.
	 *	Llama al método iniciar al cargarse la página.
	 */
    constructor() {
		$(window).on('load', this.iniciar.bind(this));
    }

    /**
     * Inicia la aplicación.
     * Crea el modelo y las vistas.
     */
    iniciar() {
		this.COOKIE_1 = 'cookies_aceptadas';
		this.COOKIE_2 = 'id_ultima_insercion';
		this.COOKIE_3 = 'numero_visitas';

        this.modelo = new Modelo(this);

		this.vistaDivBotones = new VistaDivBotones(this).mount('#divBotones');
		this.vistaBarraBusqueda = new VistaBarraBusqueda(this).mount('#divBusqueda');
		this.vistaAlta = new VistaAlta(this).mount('#divAlta');
		this.vistaListado = new VistaListado(this).mount('#divListado');
		this.vistaCookies = new VistaCookies(this).mount('#divCookies');
		this.vistaFooter = new VistaFooter(this).mount('footer');
		this.vistaModificar = new VistaModificar(this).mount('#divModificar');
		
		// Cookies
		if(!this.obtenerCookie(this.COOKIE_1)) {
			this.vistaCookies.mostrarVista(true);
		}
		else {
			this.vistaFooter.cookiesPulsadas = true;
		}

		this.crearCookie3();		  // Aumentar contador de visitas (si están las cookies permitidas).

		// Registrar callbacks
		this.modelo.registrar(this.enviarListado.bind(this));
		this.modelo.registrar(this.enviarDatosTiempo.bind(this));

		this.pulsarBotonListado();    // Iniciar desde la vista de listado.
	}

	/**
	 * Enviar el listado de componentes.
	 */
	enviarListado() {
		this.vistaListado.datos = this.modelo.getLista();
		this.vistaModificar.componentes = this.modelo.getLista();
	}

	/**
	 * Enviar datos del tiempo a la vista del footer.
	 */
	enviarDatosTiempo() {
		this.vistaFooter.datosTiempo = this.modelo.getDatosTiempo();
	}

	/**
	 * Generar cookie con valor true al aceptar las cookies, de 30 días de duración.
	 */
	crearCookie1() {
		let fecha = new Date();
		fecha.setTime(fecha.getTime() + (30 * 24 * 60 * 60 * 1000));
		const caducidad = 'expires=' + fecha.toUTCString();
		document.cookie = this.COOKIE_1 + '=' + true + ';' + caducidad + '; path=/' + ';' + 'SameSite=None;' +  'Secure'; 
		
		this.vistaFooter.cookiesPulsadas = true;
	}

	/**
	 * Generar cookie con el ID del último elemento dado de alta.
	 * @param {Number} id Identificador del elemento.
	 */
	crearCookie2(id) {
		if (this.obtenerCookie(this.COOKIE_1)) {
			let fecha = new Date();
			fecha.setTime(fecha.getTime() + (30 * 24 * 60 * 60 * 1000));
			const caducidad = 'expires=' + fecha.toUTCString();
			document.cookie = this.COOKIE_2 + '=' + id + ';' + caducidad + '; path=/;' + 'SameSite=None;' +  'Secure'; 
		}
	}

	/**
	 * Generar o modificar cookie del nº de visitas del usuario.
	 */
	crearCookie3() {
		if (this.obtenerCookie(this.COOKIE_1)) {
			let resultado = this.obtenerCookie(this.COOKIE_3);
			
			if (resultado != null || resultado != undefined) {	// Recrear cookie con +1 de valor
				let fecha = new Date();
				fecha.setTime(fecha.getTime() + (30 * 24 * 60 * 60 * 1000));
				const caducidad = 'expires=' + fecha.toUTCString();
				document.cookie = this.COOKIE_3 + '=' + (parseInt(resultado) + 1) + ';' + caducidad + '; path=/;' + 'SameSite=None;' +  'Secure'; 
			}
			else {	// Generar cookie
				let fecha = new Date();
				fecha.setTime(fecha.getTime() + (30 * 24 * 60 * 60 * 1000));
				const caducidad = 'expires=' + fecha.toUTCString();
				document.cookie = this.COOKIE_3 + '=' + 1 + ';' + caducidad + '; path=/;' + 'SameSite=None;' +  'Secure'; 
			}
		}
	}

	/**
	 * Devuelve el valor de la cookie indicada.
	 * @param {String} nombreCookie Nombre de la cookie.
	 */
	obtenerCookie(nombreCookie) {
		const cNombre = nombreCookie + '=';
		const cDecodificada = decodeURIComponent(document.cookie);
		const cArray = cDecodificada.split('; ');
		let valor;

		cArray.forEach(val => {
			if (val.indexOf(cNombre) === 0) 
				valor = val.substring(cNombre.length);
		});
		
		return valor;
	}

	/**
	 * Gestionar el permiso de cookies.
	 * @param {Boolean} permitir Si se permiten o no.
	 */
	configuracionCookies(permitir) {
		if (!permitir) {
			if(this.obtenerCookie(this.COOKIE_1))
				document.cookie = this.COOKIE_1 + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

			if(this.obtenerCookie(this.COOKIE_2))
				document.cookie = this.COOKIE_2 + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

			if(this.obtenerCookie(this.COOKIE_3)) 
				document.cookie = this.COOKIE_3 + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
		else {
			if(!this.obtenerCookie(this.COOKIE_1)) this.crearCookie1();
		}
	}

    /**
		Atención a la pulsación sobre el botón de listado
	**/
    pulsarBotonListado() {
        this.vistaListado.mostrarVista(true);
        this.vistaBarraBusqueda.mostrarVista(true);
        this.vistaAlta.mostrarVista(false);
        this.vistaModificar.mostrarVista(false);
    }

    /**
		Atención a la pulsación sobre el botón de alta
	**/
    pulsarBotonAlta() {
        this.vistaListado.mostrarVista(false);
        this.vistaBarraBusqueda.mostrarVista(false);
        this.vistaAlta.mostrarVista(true);
        this.vistaModificar.mostrarVista(false);
    }

    /**
		Atención a la pulsación sobre el botón de modificar
	**/
    pulsarBotonModificar() {
        this.vistaListado.mostrarVista(false);
        this.vistaBarraBusqueda.mostrarVista(false);
        this.vistaAlta.mostrarVista(false);
        this.vistaModificar.mostrarVista(true);
    }

    /**
		Realizar búsqueda de componentes.
		@param {String} nombre Nombre del componente.
	**/
	buscarComponentes(nombre) {
		this.modelo.buscar(nombre);
	}

    /**
		Inserta el elemento en el modelo.
    **/
    aceptarCRUD(nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3) {
        this.modelo.insertar(nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3);
    }

    /**
		Atención al click en el icono editar del CRUD.
	**/
	actualizarCRUD(id, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3) {
		this.modelo.procesarComponente(id, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3);
	}

    /**
		Atención al click en el icono eliminar del CRUD.
		Elimina el elemento en el modelo.
		@param {Number} id ID del elemento a eliminar.
	**/
	eliminarCRUD(id) {
		this.modelo.borrar(id);
	}

	/**
		Atención al click en el icono editar del CRUD.
		Manda al formulario de edición.
		@param {Number} id ID del elemento a editar.
	**/
	editarCRUD(id) {
		this.pulsarBotonModificar();
		this.vistaModificar.listado = id;
		this.vistaModificar.actualizarForm();
	}

    /**
		Devuelve el modelo de la aplicación.
		@return {Modelo} El modelo de la aplicación.
	**/
	getModelo() {
		return this.modelo;
	}
}

new Controlador();