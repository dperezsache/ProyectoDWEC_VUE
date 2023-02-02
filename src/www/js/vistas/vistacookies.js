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

		if(this.cookiesAceptadas())
		{
			this.mostrar(false);
		}

		this.botonCancelar = this.div.find('button').eq(0);
		this.botonCancelar.on('click', this.cancelar.bind(this));

		this.botonAceptar = this.div.find('button').eq(1);
		this.botonAceptar.on('click', this.aceptar.bind(this));
    }

	/**
		Cancelar las cookies.
	**/
	cancelar()
	{
		this.mostrar(false);
	}

	/**
		Aceptar las cookies
	**/
	aceptar()
	{
		this.controlador.pulsarBotonAceptarCookies();
	}

	/**
	 * Comprueba si se han aceptado las cookies.
	 * @returns {Boolean} True si se han aceptado las cookies previamente, false si no
	 */
	cookiesAceptadas()
	{
		const cNombre = 'cookieAceptada' + '=';
		const cDecodificada = decodeURIComponent(document.cookie);
		const cArray = cDecodificada.split('; ');
		console.log(cArray)
		let valor;
		cArray.forEach(val => {
			if (val.indexOf(cNombre) === 0) valor = val.substring(cNombre.length);
		});

		return valor;
	}
}