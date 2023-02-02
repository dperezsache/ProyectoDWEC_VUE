import { Modelo } from "../modelos/modelo.js";
import { VistaAlta } from "../vistas/vistaalta.js";
import { VistaDivBotones } from "../vistas/vistadivbotones.js";
import { VistaCookies } from "../vistas/vistacookies.js";
import { VistaListado } from "../vistas/vistalistado.js";
import { VistaModificar } from "../vistas/vistamodificar.js";
import { VistaBarraBusqueda } from "../vistas/vistabarrabusqueda.js";
import { VistaFooter } from "../vistas/vistafooter.js";

class Controlador 
{
    /**
	 *	Constructor de la clase.
	 *	Llama al método iniciar al cargarse la página.
	 */
    constructor() 
    {
		$(window).on('load', this.iniciar.bind(this));
    }

    /**
     * Inicia la aplicación.
     * Crea el modelo y las vistas.
     */
    iniciar() 
    {
        this.modelo = new Modelo(this);

        this.divBotones = $('#divBotones');
        this.divBarraBusqueda = $('#divBusqueda');
        this.divAlta = $('#divAlta');
		this.divCookies = $('#divCookies');
        this.divListado = $('#divListado');
        this.divModificar =  $('#divModificar');
        this.divFooter = $('#divFooter');

        this.vistaDivBotones = new VistaDivBotones(this, this.divBotones);
        this.vistaBarraBusqueda = new VistaBarraBusqueda(this, this.divBarraBusqueda, false);
		this.vistaCookies = new VistaCookies(this, this.divCookies, true);
        this.vistaAlta = new VistaAlta(this, this.divAlta, true);
        this.vistaListado = new VistaListado(this, this.divListado, true);
        this.vistaModificar = new VistaModificar(this, this.divModificar, true);
        this.vistaFooter = new VistaFooter(this, this.divFooter, true);

        this.pulsarBotonListado();    // Iniciar desde la vista de listado.
		this.crearCookie3();
    }

	/**
	 * Atención a la pulsación sobre el botón de aceptar cookies
	 */
	pulsarBotonAceptarCookies()
	{
		this.vistaCookies.mostrar(false);
		this.crearCookie1();
	}

	/**
	 * Generar cookie con valor true al aceptar las cookies, de 30 días de duración.
	 */
	crearCookie1()
	{
		let fecha = new Date();
		fecha.setTime(fecha.getTime() + (30 * 24 * 60 * 60 * 1000));
		const caducidad = 'expires=' + fecha.toUTCString();
		document.cookie = 'cookies_aceptadas=' + true + ';' + caducidad + '; path=/'; 
	}

	/**
	 * Generar cookie con el ID del último elemento dado de alta.
	 * @param {Number} id Identificador del elemento.
	 */
	crearCookie2(id)
	{
		if(this.obtenerCookie('cookies_aceptadas'))
		{
			let fecha = new Date();
			fecha.setTime(fecha.getTime() + (30 * 24 * 60 * 60 * 1000));
			const caducidad = 'expires=' + fecha.toUTCString();
			document.cookie = 'id_ultima_insercion=' + id + ';' + caducidad + '; path=/'; 
		}
	}

	/**
	 * Generar o modificar cookie del nº de visitas del usuario.
	 */
	crearCookie3()
	{
		if(this.obtenerCookie('cookies_aceptadas'))
		{
			let resultado = this.obtenerCookie('numero_visitas');
			
			if(resultado != null || resultado != undefined)	// Recrear cookie con +1 de valor
			{
				let fecha = new Date();
				fecha.setTime(fecha.getTime() + (30 * 24 * 60 * 60 * 1000));
				const caducidad = 'expires=' + fecha.toUTCString();
				document.cookie = 'numero_visitas=' + (parseInt(resultado) + 1) + ';' + caducidad + '; path=/'; 
			}
			else	// Generar cookie
			{
				let fecha = new Date();
				fecha.setTime(fecha.getTime() + (30 * 24 * 60 * 60 * 1000));
				const caducidad = 'expires=' + fecha.toUTCString();
				document.cookie = 'numero_visitas=' + 1 + ';' + caducidad + '; path=/'; 
			}
		}
	}

	/**
	 * Devuelve el valor de la cookie indicada.
	 * @param {String} nombreCookie Nombre de la cookie.
	 */
	obtenerCookie(nombreCookie)
	{
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
		Atención a la pulsación sobre el botón de listado
	**/
    pulsarBotonListado() 
    {
        this.vistaListado.mostrar(true);
        this.vistaBarraBusqueda.mostrar(true);
        this.vistaAlta.mostrar(false);
        this.vistaModificar.mostrar(false);
    }

    /**
		Atención a la pulsación sobre el botón de alta
	**/
    pulsarBotonAlta() 
    {
        this.vistaListado.mostrar(false);
        this.vistaBarraBusqueda.mostrar(false);
        this.vistaAlta.mostrar(true);
        this.vistaModificar.mostrar(false);
    }

    /**
		Atención a la pulsación sobre el botón de modificar
	**/
    pulsarBotonModificar() 
    {
        this.vistaListado.mostrar(false);
        this.vistaBarraBusqueda.mostrar(false);
        this.vistaAlta.mostrar(false);
        this.vistaModificar.mostrar(true);
    }

    /**
		Realizar búsqueda de componentes.
		@param {String} nombre Nombre del componente.
	**/
	buscarComponentes(nombre)
	{
		this.modelo.buscar(nombre);
	}

    /**
		Inserta el elemento en el modelo.
    **/
    aceptarCRUD(nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3) 
    {
        this.modelo.insertar(nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3);
    }

    /**
		Atención al click en el icono editar del CRUD.
	**/
	actualizarCRUD(id, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3)
	{
		this.modelo.procesarComponente(id, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3);
	}

    /**
		Atención al click en el icono eliminar del CRUD.
		Elimina el elemento en el modelo.
		@param {Number} id ID del elemento a eliminar.
	**/
	eliminarCRUD(id) 
    {
		this.modelo.borrar(id);
	}

	/**
		Atención al click en el icono editar del CRUD.
		Manda al formulario de edición.
		@param {Number} id ID del elemento a editar.
	**/
	editarCRUD(id) 
    {
		this.pulsarBotonModificar();
		this.vistaModificar.listado.val(id);
		this.vistaModificar.actualizarForm();
	}

    /**
		Devuelve el modelo de la aplicación.
		@return {Modelo} El modelo de la aplicación.
	**/
	getModelo() 
    {
		return this.modelo;
	}
}

const app = new Controlador();