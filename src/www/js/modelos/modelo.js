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
		this.datosTiempo;
		this.infoAEMET();
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
		@param {String} nombre Nombre del componente.
		@param {Date} fecha Fecha de lanzamiento.
		@param {Number} precio Precio del componente.
		@param {String} descripcion Descripción del componente.
		@param {Number} tipo Tipo del componente.
		@param {File} imagen Imagen del componente.
		@param {Boolean} seguro1 Seguro nº 1.
		@param {Boolean} seguro2 Seguro nº 2.
		@param {Boolean} seguro3 Seguro nº 3.
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
		@param {Number} id ID del componente.
		@param {String} nombre Nombre del componente.
		@param {Date} fecha Fecha de lanzamiento.
		@param {Number} precio Precio del componente.
		@param {String} descripcion Descripción del componente.
		@param {Number} tipo Tipo del componente.
		@param {File} imagen Imagen del componente.
		@param {Boolean} seguro1 Seguro nº 1.
		@param {Boolean} seguro2 Seguro nº 2.
		@param {Boolean} seguro3 Seguro nº 3.
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
		@param {Object} datos Objeto con los datos.
		@param {String} nombre Nombre del componente.
		@param {Date} fecha Fecha de lanzamiento.
		@param {Number} precio Precio del componente.
		@param {String} descripcion Descripción del componente.
		@param {Number} tipo Tipo del componente.
		@param {File} imagen Imagen del componente.
		@param {Boolean} seguro1 Seguro nº 1.
		@param {Boolean} seguro2 Seguro nº 2.
		@param {Boolean} seguro3 Seguro nº 3.
	**/
	actualizarComponente(datos, nombre, fecha, precio, descripcion, tipo, imagen, seguro1, seguro2, seguro3) 
	{
		datos.nombre = nombre;
		datos.fecha = fecha;
		datos.precio = precio;
		datos.descripcion = descripcion;
		datos.tipo = tipo;
		datos.seguro1 = seguro1;
		datos.seguro2 = seguro2;
		datos.seguro3 = seguro3;

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
		if(!nombre)	// Si el nombre está en blanco, recuperar los registros.
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

				this.avisar();	// Llamada callback.
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

	/**
	 * Devuelve los datos del tiempo.
	 */
	getDatosTiempo()
	{
		return this.datosTiempo;
	}

	/**
	 * Carga los datos la predicción meteorológica de Badajoz.
	 */
	infoAEMET()
	{
		const settings = {
			'async': true,
			'crossDomain': true,
			'url': 'https://opendata.aemet.es/opendata/api/prediccion/provincia/hoy/06/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXZpZHNhY2hlMDhAZ21haWwuY29tIiwianRpIjoiZTQ2ZDNlNWEtMjQ1Ni00ZDUyLTg0ZjYtYjc2ZjFjOThkOTAyIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NzQ1NzM5NjMsInVzZXJJZCI6ImU0NmQzZTVhLTI0NTYtNGQ1Mi04NGY2LWI3NmYxYzk4ZDkwMiIsInJvbGUiOiIifQ.mFEFzKjKcpHxvyinDg6iXDen6I2cdKBExm0Qb_ke5aY',
			'method': 'GET',
			'headers': {
				'cache-control': 'no-cache'
			}
		};

		$.ajax(settings)
		.done((response) => {
			if(response.estado == 200) {
				// Obtener los datos de la respuesta
				$.ajax(response.datos)
					.done((response) => {
						this.datosTiempo = response;
						this.avisar();
					})
					.fail(() => {
						this.datosTiempo =  null;
						this.avisar();
					})
			}
		}).fail(() => {
			this.datosTiempo =  null;
			this.avisar();
		})
	}
}