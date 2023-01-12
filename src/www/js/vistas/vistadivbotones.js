/**
	@file Contiene la vista del div de los botones de la aplicación
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.net>
	@license GPL-3.0-or-later
**/

/**
	Implementa una vista del menú de botones.
**/
export class VistaDivBotones {
    /**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	**/
	constructor(controlador, div) {
		this.controlador = controlador;
		this.div = div;
		
		this.botonListado = this.div.getElementsByTagName('button')[0];
		this.botonAlta = this.div.getElementsByTagName('button')[1];
        this.botonModificar = this.div.getElementsByTagName('button')[2];
		
		this.botonListado.onclick = this.pulsarListado.bind(this);
		this.botonAlta.onclick = this.pulsarAlta.bind(this);
		this.botonModificar.onclick = this.pulsarModificar.bind(this);
	}

    /**
		Atención a la pulsación sobre el enlace de listado
	**/
	pulsarListado() {
		this.controlador.pulsarBotonListado();
	}

	/**
		Atención a la pulsación sobre el enlace de CRUD
	**/
	pulsarAlta() {
		this.controlador.pulsarBotonAlta();
	}
	
	/**
		Atención a la pulsación sobre el enlace de actualizar
	**/
	pulsarModificar() {
		this.controlador.pulsarBotonModificar();
	}
}