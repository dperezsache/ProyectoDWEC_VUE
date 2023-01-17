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
    constructor(controlador) 
	{
		this.controlador = controlador;
		this.callbacks = [];
		this.listaComponentes;
		this.db;
		this.conectarDB();
    }

	/**
		Iniciar conexión con la base de datos.
	**/
	conectarDB() 
	{
		const peticion = window.indexedDB.open('ComponentesDB', 1);

		peticion.onsuccess = (event) => {
			this.db = event.target.result;
			this.obtenerRegistros();
		}

		peticion.onupgradeneeded = (event) => {
			this.db = event.target.result;
			this.db.createObjectStore('tablaComponentes', { keyPath: 'id', autoIncrement: true });
		}

		peticion.onerror = () => console.error('Error al conectar con la BBDD');
	}

	/**
		Registra un objeto para informarle de los cambios en el Modelo.
		@param {Function} callback Función de callback que será llamada cuando cambien los datos.
	**/
	registrar(callback) 
	{
		this.callbacks.push(callback);
	}

	/**
		Ejecuta todos los callback registrados.
	**/
	avisar() 
	{
		for(let callback of this.callbacks) 
			callback();
	}

	/**
	 	Insertar registro en la BD.
		@param {String} nombre 
		@param {Date} fecha 
		@param {Number} precio 
		@param {String} descripcion 
		@param {Number} tipo
		@param {File} imagen 
		@param {Boolean} seguro1
		@param {Boolean} seguro2
		@param {Boolean} seguro3 
	**/
	insertar(nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3) 
	{
		// Transformar imagen a base64
		let reader = new FileReader();
		reader.readAsDataURL(imagen);

		// Generar objeto del componente
		reader.onload = () => {
			const componente = {
				'nombre': nombre,
				'fecha': fecha,
				'precio': precio,
				'descripcion': descripcion,
				'tipo': tipo,
				'imagen': reader.result,
				'seguro1': seguro1,
				'seguro2': seguro2,
				'seguro3': seguro3
			};

			const peticion = this.db.transaction('tablaComponentes', 'readwrite').objectStore('tablaComponentes').add(componente);
			peticion.onsuccess = () => this.obtenerRegistros();
		};
	}

	/**
	 	Obtener componente usando el ID, para después poder actualizarlo.
		@param {Number} id
		@param {String} nombre 
		@param {Date} fecha 
		@param {Number} precio 
		@param {String} descripcion 
		@param {Number} tipo
		@param {File} imagen 
		@param {Boolean} seguro1
		@param {Boolean} seguro2
		@param {Boolean} seguro3 
	**/
	procesarComponente(id, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3)
	{
		const peticion = this.db.transaction('tablaComponentes', 'readwrite').objectStore('tablaComponentes').get(parseInt(id));
		peticion.onsuccess = (event) => {
			const datos = event.target.result;
			this.actualizarComponente(datos, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3);
		}
	}

	/**
	 	Actualizar los datos de un componente de la base de datos.
		@param {Object} datos
		@param {String} nombre 
		@param {Date} fecha 
		@param {Number} precio 
		@param {String} descripcion 
		@param {Number} tipo
		@param {File} imagen 
		@param {Boolean} seguro1
		@param {Boolean} seguro2
		@param {Boolean} seguro3 
	**/
	actualizarComponente(datos, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3) 
	{
		datos.nombre = nombre;
		datos.fecha = fecha;
		datos.precio = precio;
		datos.descripcion = descripcion;

		let reader = new FileReader();
		reader.readAsDataURL(imagen);
		reader.onload = () => {
			datos.imagen = reader.result;
			const peticion = this.db.transaction('tablaComponentes', 'readwrite').objectStore('tablaComponentes').put(datos);
			peticion.onsuccess = () => this.obtenerRegistros();
		}
	}

	/**
		Elimina un registro de la BBDD.
		@param {Number} id Nº identificador del registro a eliminar.
	**/
	borrar(id)
	{
		const peticion = this.db.transaction('tablaComponentes', 'readwrite').objectStore('tablaComponentes').delete(id);
		peticion.onsuccess = () => this.obtenerRegistros();
	}

	/**
		Devuelve los registros de la base de datos a un array en el modelo, después llama a los callbacks.
		@returns {Array} Datos de la BBDD.
	**/
	obtenerRegistros() 
	{
		const peticion = this.db.transaction('tablaComponentes', 'readonly').objectStore('tablaComponentes').getAll();
		
		peticion.onsuccess = () => {
			this.listaComponentes = peticion.result;
			this.avisar();
		};
	}

	/**
		Busca componentes que contengan el nombre o parte del nombre.
		@param {String} nombre Nombre del componente.
	**/
	buscar(nombre)
	{
		if(!nombre)
		{
			this.obtenerRegistros();
		}
		else
		{
			const peticion = this.db.transaction('tablaComponentes', 'readonly').objectStore('tablaComponentes').getAll();

			peticion.onsuccess = () => {
				const componentes = peticion.result;
				this.listaComponentes = [];	// Limpiar la lista de componentes
	
				for(let componente of componentes)
				{
					if(componente.nombre.includes(nombre)) 
						this.listaComponentes.push(componente);
				}

				this.avisar();
			}
		}
	}


	/**
		Devuelve la lista local de componentes.
		@returns {Array} Lista.
	**/
	getLista() 
	{
		return this.listaComponentes;
	}
}