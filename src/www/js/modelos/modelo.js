/**
	@file Contiene el modelo de la aplicación.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.net>
	@license GPL-3.0-or-later
**/

/**
	Clase Modelo.
	Gestiona los datos de la aplicación.
**/
export class Modelo 
{
    constructor() 
	{
		this.nombre;	  // Nombre del componente (texto corto).
		this.precio;	  // Precio del componente (número con decimales).
		this.fecha;		  // Fecha cúando fue diseñado el componente (fecha SIN hora).
		this.descripcion; // Descripción del componente (texto largo).
		this.seguros;	  // Los seguros que se ofrece al componente: por caída, viene dañado de fábrica... (checkboxes).
		this.categoría;	  // Categoría a la que pertenece el componente: CPU, GPU, RAM, PSU, Placa base, Disco duro o torre (select).
		this.imagen;	  // Imagen del componente (blob).
    }
}