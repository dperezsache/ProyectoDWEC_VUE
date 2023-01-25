/**
	@file Contiene la vista de modificar.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.net>
	@license GPL-3.0-or-later
**/

import {Vista} from './vista.js';

/**
	Vista de la página de modificar.
**/
export class VistaModificar extends Vista
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

		this.modelo = this.controlador.getModelo();
		this.modelo.registrar(this.cargarListado.bind(this));

		// Coger referencias de los elementos
		this.listado = this.div.find('select').eq(0);
		this.campoNombre = this.div.find('input').eq(0);
		this.campoFecha = this.div.find('input').eq(1);
		this.campoPrecio = this.div.find('input').eq(2);
		this.campoDescripcion = this.div.find('textarea').eq(0);
		this.campoTipo = this.div.find('select').eq(1);
		this.campoImagen = this.div.find('input').eq(3);
		this.seguro1 = this.div.find('input').eq(4);
		this.seguro2 = this.div.find('input').eq(5);
		this.seguro3 = this.div.find('input').eq(6);
		this.botonCancelar = this.div.find('button').eq(0);
		this.botonAceptar = this.div.find('button').eq(1);
		this.parrafoAviso = this.div.find('.pAviso').eq(0);
		
		// Asignar eventos.
		this.listado.on('click', this.actualizarForm.bind(this));
		this.botonAceptar.on('click', this.aceptar.bind(this));
		this.botonCancelar.on('click', this.cancelar.bind(this));

		// JQUERY UI
		this.campoFecha.datepicker({
			showOtherMonths: true,
			selectOtherMonths: true,
			showButtonPanel: true,
			changeYear: true
		});

		this.campoTipo.selectmenu();
    }

	/**
		Actualiza el formulario con los datos del personaje seleccionado.
	**/
	actualizarForm() 
	{
		let componentes = this.modelo.getLista();
		let dato = null;

		if(componentes != null) 
		{
			for(let componente of componentes) 
			{
				if(componente.id == this.listado.val()) 
				{
					dato = componente;
					break;
				}
			}

			if(dato != null) 
			{
				this.campoNombre.val(dato.nombre);
				this.campoFecha.val(dato.fecha);
				this.campoPrecio.val(dato.precio);
				this.campoDescripcion.val(dato.descripcion);
				this.campoTipo.val(dato.tipo);
				this.seguro1.prop('checked', dato.seguro1);
				this.seguro2.prop('checked', dato.seguro2);
				this.seguro3.prop('checked', dato.seguro3);
			}
		}
	}

	/**
		Carga el listado de componentes a actualizar. 
	**/
	cargarListado()
	{
		this.borrarListado();
		let componentes = this.modelo.getLista();

		if(componentes != null)
		{
			let primeraOpcion = $('<option></option>');
			primeraOpcion.text('-- Selecciona componente --');
			primeraOpcion.attr('value', '-1');
			primeraOpcion.attr('disabled', '');
			primeraOpcion.attr('selected', '');
			this.listado.append(primeraOpcion);

			for(let componente of componentes)
			{
				let option = $('<option></option>');
				option.attr('value', componente.id);
				option.text(componente.nombre);
				this.listado.append(option);
			}
		}
	}

	/**
		Atención al click de aceptar actualización.
	**/
	aceptar()
	{
		const colorOk = '1px solid #ADACAC'; 
		const colorMal = '1px solid crimson';
		let cont = 0;

		// Validación listado
		if (this.listado.val() != -1)
		{
			cont++;
			this.listado.css('border', colorOk);
		}
		else
		{
			this.listado.css('border', colorMal);
		}

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
		if (this.campoFecha.val() && this.campoFecha.val().match(/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/)) 
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

		if(cont == 7) 
		{
			this.parrafoAviso.text('✔️ Componente actualizado correctamente ✔️');

			this.controlador.actualizarCRUD(
				this.listado.val(),
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

			this.cancelar();	// Borrar los campos una vez modificado el elemento.
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

	/**
		Borra todos los options del select.
	**/
	borrarListado()
	{
		this.listado.empty();
	}

	mostrar(ver)
	{
		super.mostrar(ver);
		this.parrafoAviso.hide();
	}
}