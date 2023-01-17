import { Modelo } from "../modelos/modelo.js";
import { VistaAlta } from "../vistas/vistaalta.js";
import { VistaDivBotones } from "../vistas/vistadivbotones.js";
import { VistaListado } from "../vistas/vistalistado.js";
import { VistaModificar } from "../vistas/vistamodificar.js";
import { VistaBarraBusqueda } from "../vistas/vistabarrabusqueda.js";

class Controlador 
{
    /**
	 *	Constructor de la clase.
	 *	Llama al método iniciar al cargarse la página.
	 */
    constructor() 
    {
        window.onload = this.iniciar.bind(this);
    }

    /**
     * Inicia la aplicación.
     * Crea el modelo y las vistas.
     */
    iniciar() 
    {
        this.modelo = new Modelo(this);

        this.divBotones = document.getElementById('divBotones');
        this.divBarraBusqueda = document.getElementById('divBusqueda');
        this.divAlta = document.getElementById('divAlta');
        this.divListado = document.getElementById('divListado');
        this.divModificar = document.getElementById('divModificar');

        this.vistaDivBotones = new VistaDivBotones(this, this.divBotones);
        this.vistaBarraBusqueda = new VistaBarraBusqueda(this, this.divBarraBusqueda);
        this.vistaAlta = new VistaAlta(this, this.divAlta);
        this.vistaListado = new VistaListado(this, this.divListado);
        this.vistaModificar = new VistaModificar(this, this.divModificar);

        this.pulsarBotonListado();    // Iniciar desde la vista de listado.
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
		this.vistaModificar.listado.value = id;
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