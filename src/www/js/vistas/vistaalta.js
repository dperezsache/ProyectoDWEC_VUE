/**
	@file Contiene la vista de alta.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.net>
	@license GPL-3.0-or-later
**/

import {Vista} from './vista.js';

/**
	Vista del alta.
	Contiene el formulario de inserción.
**/
export class VistaAlta extends Vista {
	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	**/
	constructor(controlador, div) {
        super(controlador, div);
    }
}