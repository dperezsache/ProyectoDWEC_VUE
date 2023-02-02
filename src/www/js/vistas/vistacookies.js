/**
	@file Contiene la vista de las cookies.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.net>
	@license GPL-3.0-or-later
**/

import {Vista} from './vista.js';

/**
	Vista Cookies.
**/
export class VistaCookies extends Vista 
{
	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
		@param {Boolean} efecto Si habrá efecto al mostrarse/ocultarse.
	**/
    constructor(controlador, div, efecto) 
	{
        super(controlador, div, efecto);

		if(this.controlador.obtenerCookie('cookies_aceptadas'))
		{
			this.mostrar(false);
		}

		this.botonCancelar = this.div.find('button').eq(0);
		this.botonCancelar.on('click', this.cancelar.bind(this));

		this.botonAceptar = this.div.find('button').eq(1);
		this.botonAceptar.on('click', this.aceptar.bind(this));
    }

	/**
		Ocultar el aviso de cookies.
	**/
	cancelar()
	{
		this.mostrar(false);
	}

	/**
		Aceptar las cookies.
	**/
	aceptar()
	{
		this.controlador.pulsarBotonAceptarCookies();
	}
}