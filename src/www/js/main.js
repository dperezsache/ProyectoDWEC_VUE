import Producto from './componentes/producto.js'; 

// Vista Listado
const listado = Vue.createApp({
    components: {
        Producto
    }
}).mount('#divListado');

// Vista Alta
const alta = Vue.createApp({

}).mount('#divAlta');

// Vista Modificar
const modificar = Vue.createApp({

}).mount('#divModificar');