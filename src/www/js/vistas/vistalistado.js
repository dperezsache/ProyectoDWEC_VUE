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
	**/
    constructor(controlador, div) 
	{
        super(controlador, div);
		
		// Hacemos que VistaListado "observe" al Modelo.
		this.modelo = this.controlador.getModelo();
		this.modelo.registrar(this.actualizar.bind(this));

		this.pAviso = this.div.getElementsByClassName('pAviso')[0];
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
			this.pAviso.style.display = 'none';

			for(let componente of componentes) 
			{
				// DIV
				let contenedor = document.createElement('div');
				contenedor.className = 'divItem';
				this.div.appendChild(contenedor);

				// Imagen
				let img = document.createElement('img');
				img.width = '256px';
				img.height = '256px';
				img.style.display = 'block';
				img.src = componente.imagen;
				img.alt = componente.nombre;
				contenedor.appendChild(img);

				// Nombre
				let pNombre = document.createElement('p');
				pNombre.className = 'pNombreItem';
				pNombre.innerText = componente.nombre;
				contenedor.appendChild(pNombre);

				// Precio
				let pPrecio = document.createElement('p');
				pPrecio.className = 'pPrecioItem';

				let precio = parseFloat(componente.precio).toFixed(2);
				console.log(precio)

				pPrecio.innerText = precio;
				pPrecio.innerText = precio + '€';
				pPrecio.innerText = pPrecio.innerText.replace('.', ',');
				contenedor.appendChild(pPrecio);

				// Descripción
				let divDesc = document.createElement('div');
				divDesc.className = 'divDescItem';

				let pDesc = document.createElement('p');
				pDesc.innerText = componente.descripcion;
				divDesc.appendChild(pDesc);
				contenedor.appendChild(divDesc);

				// Fecha
				let divFecha = document.createElement('div');
				divFecha.className = 'pFechaItem';
				
				let pFecha = document.createElement('p');
				let trozos = componente.fecha.split('-');

				pFecha.innerHTML = 'Fecha de lanzamiento: <span class="spanFecha">' + trozos[2] + '/' + trozos[1] + '/' + trozos[0] + '</span>';
				divFecha.appendChild(pFecha);
				contenedor.appendChild(divFecha);

				// Checkboxes
				let ul = document.createElement('ul');

				let li1 = document.createElement('li');
				if (componente.seguro1) li1.innerText = 'Se ofrece seguro contra robos.';
				else li1.innerText = 'No se ofrece seguro contra robos.';
				ul.appendChild(li1);

				let li2 = document.createElement('li');
				if (componente.seguro2) li2.innerText = 'Se ofrece seguro contra roturas.';
				else li2.innerText = 'No se ofrece seguro contra roturas.';
				ul.appendChild(li2);

				let li3 = document.createElement('li');
				if (componente.seguro3) li3.innerText = 'Se ofrece seguro contra caídas no accidentales.';
				else li3.innerText = 'No se ofrece seguro contra caídas no accidentales.';
				ul.appendChild(li3);
				contenedor.appendChild(ul);

				// Botones
				let divBotones = document.createElement('div');

				// Botón eliminar
				let botonEliminar = document.createElement('button');
				botonEliminar.className = 'buttonBorrar';
				let spanEliminar = document.createElement('span');
				spanEliminar.className = 'material-icons';
				spanEliminar.innerText = 'delete';
				spanEliminar.onclick = this.eliminar.bind(this, componente.id)
				botonEliminar.appendChild(spanEliminar);
				divBotones.appendChild(botonEliminar);

				// Botón editar
				let botonEditar = document.createElement('button');
				botonEditar.className = 'buttonEditar';
				let spanEditar = document.createElement('span');
				spanEditar.className = 'material-icons';
				spanEditar.innerText = 'edit';
				spanEditar.onclick = this.editar.bind(this, componente.id);
				botonEditar.appendChild(spanEditar);
				divBotones.appendChild(botonEditar);
				contenedor.appendChild(divBotones);
			}
		}
		else
		{
			this.pAviso.style.display = 'block';
		}
	}

	/**
	 * Borra los elementos del listado.
	 */
	borrarElementos() 
	{
		while(this.div.childNodes.length > 1)
		{
			if (this.div.lastChild === this.pAviso) break;
			else this.div.removeChild(this.div.lastChild);
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