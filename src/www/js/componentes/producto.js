export default {
    props: {
        nombre_item: String,
        url_foto: String,
        precio_item: Number,
        descripcion_item: String,
        tipo_producto: String,
        fecha_lanzamiento: Date,
        seguro1: Boolean,
        seguro2: Boolean,
        seguro3: Boolean
    },
    template:
    /*html*/
    `<div class="divItem" role="listitem" tabindex="0">
        <img style="width: 256px; height: 256px; display: block;" v-bind:src="url_foto" v-bind:alt="nombre_item"/>
        <p class="pnombre_item" tabindex="0">{{ this.nombre_item }}</p>
        <p class="pprecio_item" tabindex="0">{{ this.precio_item }}</p>
        <div class="divDescItem">
            <p tabindex="0">{{ this.descripcion_item }}</p>
        </div>
        <ul>
            <li tabindex="0">
                Tipo de producto: <span class="spanFecha">{{ this.tipo_producto }}</span>
            </li>
            <li tabindex="0">
                Fecha lanzamiento: <span class="spanFecha">{{ this.fecha_lanzamiento }}</span>
            </li>
        </ul>
        <hr class="hrItems"/>
        <ul>
            <li tabIndex="0">
                <p>{{ this.ofreceSeguro1 }}</p>
            </li>
            <li tabIndex="0">
                <p>{{ this.ofreceSeguro2 }}</p>
            </li>
            <li tabindex="0">
                <p>{{ this.ofreceSeguro3 }}</p>
            </li>
        </ul>
        <div>
            <button class="boton" style="margin-right: 10px;">
                <span class="ui-icon ui-icon-trash" role="img" aria-label="Eliminar" tabindex="0"></span>
            </button>
            <button class="boton" style="margin-right: 10px;">
                <span class="ui-icon ui-icon-pencil" role="img" aria-label="Eliminar" tabindex="0"></span>
            </button>
        </div>
    </div>`,
    computed: {
        ofreceSeguro1() {
            if (this.seguro1) return 'Se ofrece seguro contra robos.';
            else return 'No se ofrece seguro contra robos.';
        },
        ofreceSeguro2() {
            if (this.seguro2) return 'Se ofrece seguro contra roturas.';
            else return 'No se ofrece seguro contra roturas.';
        },
        ofreceSeguro3() {
            if (this.seguro3) return 'Se ofrece seguro contra caídas.';
            else return 'No se ofrece seguro contra caídas.';
        }
    }
}