/**
	@file Contiene la vista del pie de página.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.net>
	@license GPL-3.0-or-later
**/

import {Vista} from './vista.js';

/**
	Vista del footer.
**/
export class VistaFooter extends Vista 
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
        this.pInformacion = $('#pTiempo');

        // Hacemos que VistaFooter "observe" al Modelo.
		this.modelo = this.controlador.getModelo();
		this.modelo.registrar(this.informacionTiempo.bind(this));
    }

    /**
     * Procesar datos del tiempo y mostrarlos.
     */
    informacionTiempo()
    {
        let datos = this.modelo.getDatosTiempo();

        if(datos != null)
        {
            datos = datos.split('BADAJOZ');
            this.pInformacion.show();
            this.pInformacion.text('BADAJOZ:' + datos[2]);
        }
        else
        {
            this.pInformacion.hide();
        }
    }
}