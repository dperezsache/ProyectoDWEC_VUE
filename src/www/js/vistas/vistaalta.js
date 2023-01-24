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
		@param {Boolean} efecto Si habrá efecto al mostrarse/ocultarse.
	**/
	constructor(controlador, div, efecto) 
	{
        super(controlador, div, efecto);

		// Coger referencias de los elementos
		this.campoNombre = this.div.find('input').eq(0);
		this.campoFecha = this.div.find('input').eq(1);
		this.campoPrecio = this.div.find('input').eq(2);
		this.campoDescripcion = this.div.find('textarea').eq(0);
		this.campoTipo = this.div.find('select').eq(0);
		this.campoImagen = this.div.find('input').eq(3);
		this.seguro1 = this.div.find('input').eq(4);
		this.seguro2 = this.div.find('input').eq(5);
		this.seguro3 = this.div.find('input').eq(6);
		this.botonCancelar = this.div.find('button').eq(0);
		this.botonAceptar = this.div.find('button').eq(1);
		this.parrafoAviso = this.div.find('.pAviso').eq(0);
		
		this.botonAceptar.on('click', this.aceptar.bind(this));
		this.botonCancelar.on('click', this.cancelar.bind(this));
    }

	/**
		Atención al click sobre el botón Aceptar de la vista.
	**/
	aceptar() 
	{
		const colorOk = '1px solid #ADACAC'; 
		const colorMal = '1px solid crimson';
		let cont = 0;

		// Validación nombre
		if (this.campoNombre.val() && this.campoNombre.val().length <= 50) 
		{
			cont++;
			this.campoNombre.css('border', colorOk);
		}
		else 
		{
			this.campoNombre.css('border', colorMal);
		}

		// Validación fecha
		if (this.campoFecha.val()) 
		{
			cont++;
			this.campoFecha.css('border', colorOk);
		}
		else 
		{
			this.campoFecha.css('border', colorMal);
		}

		// Validación precio
		if (this.campoPrecio.val() && !isNaN(this.campoPrecio.val()) && this.campoPrecio.val() > 0) 
		{
			cont++;
			this.campoPrecio.css('border', colorOk);
		}
		else 
		{
			this.campoPrecio.css('border', colorMal);
		}

		// Validación tipo
		if (this.campoTipo.val() != -1)
		{
			cont++;
			this.campoTipo.css('border', colorOk);
		}
		else
		{
			this.campoTipo.css('border', colorMal);
		}

		// Validación descripción
		if (this.campoDescripcion.val() && this.campoDescripcion.val().length <= 500)
		{
			cont++;
			this.campoDescripcion.css('border', colorOk);
		}
		else
		{
			this.campoDescripcion.css('border', colorMal);
		}

		// Validación imagen
		if (this.campoImagen.prop('files')[0] != null)
		{
			cont++;
			this.campoImagen.css('border', colorOk);
		}
		else
		{
			this.campoImagen.css('border', colorMal);
		}

		window.scrollTo(0, 0);	// Mover al top de la página.
		this.parrafoAviso.show();

		if(cont == 6) 
		{
			this.parrafoAviso.text('✔️ Componente añadido correctamente ✔️');
			
			this.controlador.aceptarCRUD(
				this.campoNombre.val(), 
				this.campoFecha.val(), 
				this.campoPrecio.val(),
				this.campoDescripcion.val(), 
				this.campoTipo.val(),
				this.campoImagen.prop('files')[0], 
				this.seguro1.is(':checked'),
				this.seguro2.is(':checked'),
				this.seguro3.is(':checked')
			);

			this.cancelar();	// Borrar los campos una vez añadido el elemento.
		}
		else
		{
			this.parrafoAviso.text('⚠️ Rellena correctamente los campos indicados ⚠️');
		}
	}

	/**
		Limpiar los campos del formulario.
	**/
	cancelar() 
	{
		this.campoNombre.val('');
		this.campoFecha.val('');
		this.campoPrecio.val('');
		this.campoDescripcion.val('');
		this.campoTipo.val(-1);
		this.campoImagen.val('');
		this.seguro1.prop('checked', false);
		this.seguro2.prop('checked', false);
		this.seguro3.prop('checked', false);
	}

	mostrar(ver, efecto)
	{
		super.mostrar(ver, efecto);
		this.parrafoAviso.hide();
	}
}