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
			this.pAviso.attr('aria-hidden', 'true');

			for(let componente of componentes) 
			{
				/*let tipo;
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
				}*/
			}
		}
		else
		{
			this.pAviso.show();
			this.pAviso.attr('aria-hidden', 'false');
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