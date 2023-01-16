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
export class VistaAlta extends Vista 
{
	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	**/
	constructor(controlador, div) 
	{
        super(controlador, div);

		// Coger referencias de los elementos
		this.campoNombre = this.div.getElementsByTagName('input')[0];
		this.campoFecha = this.div.getElementsByTagName('input')[1];
		this.campoPrecio = this.div.getElementsByTagName('input')[2];
		this.campoDescripcion = this.div.getElementsByTagName('textarea')[0];
		this.campoTipo = this.div.getElementsByTagName('select')[0];
		this.campoImagen = this.div.getElementsByTagName('input')[3];
		this.seguro1 = this.div.getElementsByTagName('input')[4];
		this.seguro2 = this.div.getElementsByTagName('input')[5];
		this.seguro3 = this.div.getElementsByTagName('input')[6];
		this.botonAceptar = this.div.getElementsByTagName('button')[0];
		this.botonCancelar = this.div.getElementsByTagName('button')[1];
		
		this.botonAceptar.onclick = this.aceptar.bind(this);
		this.botonCancelar.onclick = this.cancelar.bind(this);
    }

	/**
		Atención al click sobre el botón Aceptar de la vista.
	**/
	aceptar() 
	{
		if(this.campoNombre.value && this.campoFecha.value && this.campoPrecio.value && this.campoTipo && this.campoDescripcion.value && this.campoTipo.value!=-1 && this.campoImagen.files[0]!=null) 
		{
			this.controlador.aceptarCRUD(
				this.campoNombre.value, 
				this.campoFecha.value, 
				this.campoPrecio.value,
				this.campoDescripcion.value, 
				this.campoTipo.value,
				this.campoImagen.files[0], 
				this.seguro1.checked,
				this.seguro2.checked,
				this.seguro3.checked
			);
		}
	}

	/**
		Limpiar los campos del formulario.
	**/
	cancelar() 
	{
		this.campoNombre.value = '';
		this.campoFecha.value = '';
		this.campoPrecio.value = '';
		this.campoDescripcion.value = '';
		this.campoTipo.value = -1;
		this.campoImagen.value = '';
		this.seguro1.checked = false;
		this.seguro2.checked = false;
		this.seguro3.checked = false;
	}
}