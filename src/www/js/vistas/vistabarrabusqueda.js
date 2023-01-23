/**
	@file Contiene la vista de la barra de búsqueda.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.net>
	@license GPL-3.0-or-later
**/

import {Vista} from './vista.js';

/**
	Vista de la barra de búsqueda.
	Contiene todos los componentes que hayan.
**/
export class VistaBarraBusqueda extends Vista 
{
	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	**/
    constructor(controlador, div) 
	{
        super(controlador, div);

		this.campoBuscar = this.div.find('input').eq(0);
		this.botonBuscar = this.div.find('button').eq(0);

		this.botonBuscar.on('click', this.busqueda.bind(this));
    }

	/**
		Realiza búsqueda de componentes
	**/
	busqueda()
	{
		this.controlador.buscarComponentes(this.campoBuscar.val());
	}
}