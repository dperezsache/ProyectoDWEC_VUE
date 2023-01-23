/**
	@file Contiene la vista del div de los botones de la aplicación
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.net>
	@license GPL-3.0-or-later
**/

/**
	Implementa una vista del menú de botones.
**/
export class VistaDivBotones 
{
    /**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	**/
	constructor(controlador, div) 
	{
		this.controlador = controlador;
		this.div = div;
		
		this.botonListado = this.div.find('#buttonListado');
		this.botonAlta = this.div.find('#buttonAlta');
        this.botonModificar = this.div.find('#buttonModificar');
		
		this.botonListado.on('click', this.pulsarListado.bind(this));
		this.botonAlta.on('click', this.pulsarAlta.bind(this));
		this.botonModificar.on('click', this.pulsarModificar.bind(this));
	}

    /**
		Atención a la pulsación sobre el enlace de listado
	**/
	pulsarListado() 
	{
		this.controlador.pulsarBotonListado();
	}

	/**
		Atención a la pulsación sobre el enlace de CRUD
	**/
	pulsarAlta() 
	{
		this.controlador.pulsarBotonAlta();
	}
	
	/**
		Atención a la pulsación sobre el enlace de actualizar
	**/
	pulsarModificar() 
	{
		this.controlador.pulsarBotonModificar();
	}
}