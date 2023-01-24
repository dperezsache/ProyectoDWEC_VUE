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
export class VistaListado extends Vista 
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
		
		// Hacemos que VistaListado "observe" al Modelo.
		this.modelo = this.controlador.getModelo();
		this.modelo.registrar(this.actualizar.bind(this));

		this.pAviso = this.div.find('.pAviso').eq(0);
	}

	/**
		Recibe el aviso del modelo cuando ha sido actualizado.
		Actualiza los datos de la vista.
	**/
	actualizar() 
	{
		this.borrarElementos();
		
		let componentes = this.modelo.getLista();

		if(componentes != null && componentes.length > 0) 
		{
			this.pAviso.hide();

			for(let componente of componentes) 
			{
				// DIV
				let contenedor = $('<div></div>');
				contenedor.addClass('divItem');
				this.div.append(contenedor);

				// Imagen
				let img = $('<img></img>');
				img.width('256px');
				img.height('256px');
				img.css('display', 'block');
				img.attr('src', componente.imagen);
				img.attr('alt', componente.nombre);
				contenedor.append(img);

				// Nombre
				let pNombre = $('<p></p>');
				pNombre.addClass('pNombreItem');
				pNombre.text(componente.nombre);
				contenedor.append(pNombre);

				// Precio
				let pPrecio = $('<p></p>');
				pPrecio.addClass('pPrecioItem');
				let precio = parseFloat(componente.precio).toFixed(2);
				pPrecio.text(precio);
				pPrecio.text(precio + '€');
				pPrecio.text(pPrecio.text().replace('.', ','));
				contenedor.append(pPrecio);

				// Descripción
				let divDesc = $('<div></div>');
				divDesc.addClass('divDescItem');

				let pDesc = $('<p></p>');
				pDesc.text(componente.descripcion);
				divDesc.append(pDesc);
				contenedor.append(divDesc);

				// Tipo
				let ulInfo = $('<ul></ul>');
				let liTipo = $('<li></li>');
				let tipo;
				switch(parseInt(componente.tipo))
				{
					case 1:
						tipo = 'Procesador';
						break;
					case 2:
						tipo = 'Tarjeta gráfica';
						break;
					case 3:
						tipo = 'Memoria RAM';
						break;
					case 4:
						tipo = 'Fuente de alimentación';
						break;
					case 5:
						tipo = 'Placa base';
						break;
					case 6:
						tipo = 'Disco duro';
						break;
					case 7:
						tipo = 'Torre';
						break;
					case 8:
						tipo = 'Otro';
						break;
					default:
						tipo = '';
						break;
				}
				liTipo.html('Tipo de producto: <span class="spanFecha">' + tipo + '</span>');
				ulInfo.append(liTipo);

				// Fecha
				let liFecha = $('<li></li>');
				let trozos = componente.fecha.split('-');
				liFecha.html('Fecha de lanzamiento: <span class="spanFecha">' + trozos[2] + '/' + trozos[1] + '/' + trozos[0] + '</span>');
				ulInfo.append(liFecha);
				contenedor.append(ulInfo);

				// Separador
				let hr = $('<hr/>');
				hr.addClass('hrItems');
				hr.width('350px'); 
				contenedor.append(hr);
				
				// Checkboxes
				let ul = $('<ul></ul>');
				ul.css('listStyleType', "'- '"); 
				let li1 = $('<li></li>');
				if (componente.seguro1) li1.text('Se ofrece seguro contra robos.');
				else li1.text('No se ofrece seguro contra robos.');
				ul.append(li1);

				let li2 = $('<li></li>');
				if (componente.seguro2) li2.text('Se ofrece seguro contra roturas.');
				else li2.text('No se ofrece seguro contra roturas.');
				ul.append(li2);

				let li3 = $('<li></li>');
				if (componente.seguro3) li3.text('Se ofrece seguro contra caídas.');
				else li3.text('No se ofrece seguro contra caídas.');
				ul.append(li3);
				contenedor.append(ul);

				// Botones
				let divBotones = $('<div></div>');

				// Botón eliminar
				let botonEliminar = $('<button></button>');
				botonEliminar.addClass('boton');
				botonEliminar.css('marginRight', '10px');
				let spanEliminar = $('<span></span>');
				spanEliminar.addClass('material-icons');
				spanEliminar.text('delete');
				spanEliminar.on('click', this.eliminar.bind(this, componente.id));
				botonEliminar.append(spanEliminar);
				divBotones.append(botonEliminar);

				// Botón editar
				let botonEditar = $('<button></button>');
				botonEditar.addClass('boton');
				let spanEditar = $('<span></span>');
				spanEditar.addClass('material-icons');
				spanEditar.text('edit');
				spanEditar.on('click', this.editar.bind(this, componente.id));
				botonEditar.append(spanEditar);
				divBotones.append(botonEditar);
				contenedor.append(divBotones);
			}
		}
		else
		{
			this.pAviso.show();
		}
	}

	/**
	 * Borra los elementos del listado.
	 */
	borrarElementos() 
	{
		while(this.div.children().length > 1)
		{
			if (this.div.children().last() === this.pAviso) 
			{
				break;
			}
			else 
			{
				this.div.children().last().remove();
			}
		} 
	}

	/**
		Atención al evento eliminar de una fila.
		@param {Number} id ID del dato a eliminar.
	**/
	eliminar(id) 
	{
		this.controlador.eliminarCRUD(id);
	}
	
	/**
		Atención al evento editar de una fila.
		@param {Number} id ID del dato a editar.
	**/
	editar(id) 
	{
		this.controlador.editarCRUD(id);
	}
}