import { Modelo } from "../modelos/modelo.js";
import { VistaAlta } from "../vistas/vistaalta.js";
import { VistaDivBotones } from "../vistas/vistadivbotones.js";
import { VistaListado } from "../vistas/vistalistado.js";
import { VistaModificar } from "../vistas/vistamodificar.js";
import { VistaBarraBusqueda } from "../vistas/vistabarrabusqueda.js";

class Controlador {
    /**
	 *	Constructor de la clase.
	 *	Llama al método iniciar al cargarse la página.
	 */
    constructor() {
        window.onload = this.iniciar.bind(this);
    }

    /**
     * Inicia la aplicación.
     * Crea el modelo y las vistas.
     */
    iniciar() {
        this.modelo = new Modelo();

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
    pulsarBotonListado() {
        this.vistaListado.mostrar(true);
        this.vistaBarraBusqueda.mostrar(true);
        this.vistaAlta.mostrar(false);
        this.vistaModificar.mostrar(false);
    }

    /**
		Atención a la pulsación sobre el botón de alta
	**/
    pulsarBotonAlta() {
        this.vistaListado.mostrar(false);
        this.vistaBarraBusqueda.mostrar(false);
        this.vistaAlta.mostrar(true);
        this.vistaModificar.mostrar(false);
    }

    /**
		Atención a la pulsación sobre el botón de modificar
	**/
    pulsarBotonModificar() {
        this.vistaListado.mostrar(false);
        this.vistaBarraBusqueda.mostrar(false);
        this.vistaAlta.mostrar(false);
        this.vistaModificar.mostrar(true);
    }
}

const app = new Controlador();