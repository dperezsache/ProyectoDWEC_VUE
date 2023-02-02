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
        this.divConfCookies = $('#divConfCookies');
        this.botonCookies = $('#buttonCookies');
        this.checkboxCookie = this.div.find('input').eq(0);
        this.pInformacion = $('#pTiempo');
        this.botonTiempo = $('#buttonTiempo');

        // Hacemos que VistaFooter "observe" al Modelo.
		this.modelo = this.controlador.getModelo();
		this.modelo.registrar(this.informacionTiempo.bind(this));

        this.botonCookies.on('click', this.mostrarOcultarConfCookies.bind(this));
        this.mostrarOcultarConfCookies();

        this.botonTiempo.on('click', this.mostrarOcultarTiempo.bind(this));
        this.mostrarOcultarTiempo();

        this.checkboxCookie.on('click', this.permitirCookies.bind(this))
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
            
            if(datos[2] != null) 
            {
                this.pInformacion.text('BADAJOZ:' + datos[2]);
            }
            else
            {
                this.pInformacion.text('');
            }
        }
        else
        {
            this.pInformacion.text('');
        }
    }

    /**
     * Muestra/oculta el panel del tiempo
     */
    mostrarOcultarTiempo()
    {
        if(this.pInformacion.is(':visible'))
        {
            this.pInformacion.hide();
            this.pInformacion.attr('aria-hidden', 'true');
        }
        else
        {
            this.pInformacion.show();
            this.pInformacion.attr('aria-hidden', 'false');
        }
    }

    /**
     * Muestra/oculta el panel de configuración de cookies
     */
    mostrarOcultarConfCookies()
    {
        if(this.divConfCookies.is(':visible'))
        {
            this.divConfCookies.hide();
            this.divConfCookies.attr('aria-hidden', 'true');
        }
        else
        {
            this.divConfCookies.show();
            this.divConfCookies.attr('aria-hidden', 'false');
        }
    }

    /**
     * Habilitar o no las cookies.
     */
    permitirCookies()
    {
        this.controlador.configuracionCookies(this.checkboxCookie.is(':checked'));
    }
}