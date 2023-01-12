/**
	@file Contiene la vista del listado.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.net>
	@license GPL-3.0-or-later
**/

import {Vista} from './vista.js';

/**
	Vista del listado.
	Contiene todos los componentes que hayan.
**/
export class VistaListado extends Vista {
	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	**/
    constructor(controlador, div) {
        super(controlador, div);
        this.modelo = this.controlador.getModelo();
    }
}