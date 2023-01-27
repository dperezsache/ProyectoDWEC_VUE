/**
	@file Contiene el modelo de la aplicación
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.es>
	@license GPL-3.0-or-later
**/

/**
	Implementa una vista.
**/
export class Vista 
{
	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
		@param {Boolean} efecto Si habrá efecto al mostrarse/ocultarse.
	**/
    constructor(controlador, div, efecto) 
	{
		this.efecto = efecto;
		this.controlador = controlador;
        this.div = div;
    }

    /**
		Muestra u oculta el div principal de la vista.
		@param {Boolean} ver True muestra la vista y false la oculta.
	**/
	mostrar(ver)
	{
		if(ver) 
		{
			if (this.efecto) this.div.show('fade', 'linear');
			else this.div.show();
			this.div.attr('aria-hidden', 'false');
        }
		else 
		{
			if (this.efecto) this.div.hide('fade', 'linear');
			else this.div.hide();
			this.div.attr('aria-hidden', 'true');
        }
	}
}