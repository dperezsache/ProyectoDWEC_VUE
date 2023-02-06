/**
	Implementa una vista del menú de botones.
**/
export function VistaDivBotones(controlador)
{
	return VistaDivBotones = Vue.createApp({
		data() {
			return {
				controlador: controlador,
			}
		},
		template:
		/*html*/
		`<div role="menubar">
			<button type="button" id="buttonListado" role="menuitem" @click='pulsarListado'>
				Listado de componentes 
				<span class="material-icons" role="img" aria-label="Listar">list</span>
			</button>
			<button type="button" id="buttonAlta" role="menuitem" @click='pulsarAlta'>
				Alta de componente 
				<span class="material-icons" role="img" aria-label="Añadir">add</span>
			</button>
			<button type="button" id="buttonModificar" role="menuitem" @click='pulsarModificar'>
				Modificar componente 
				<span class="material-icons" role="img" aria-label="Editar">edit</span>
			</button>
		</div>`,
		methods: {
			/**
				Atención a la pulsación sobre el enlace de listado
			**/
			pulsarListado() {
				this.controlador.pulsarBotonListado();
			},
			/**
				Atención a la pulsación sobre el enlace de CRUD
			**/
			pulsarAlta() {
				this.controlador.pulsarBotonAlta();
			},
			/**
				Atención a la pulsación sobre el enlace de actualizar
			**/
			pulsarModificar() {
				this.controlador.pulsarBotonModificar();
			}
		}
	});
}