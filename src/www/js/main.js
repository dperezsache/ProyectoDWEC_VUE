import producto from './componentes/producto.js'; 

// Vista Listado
const listado = Vue.createApp({
    components: {
        producto
    }
});

const listadoMount = listado.mount('#divListado');

// Vista Alta
const alta = Vue.createApp({

});

const altaMount = alta.mount('#divAlta');

// Vista Modificar
const modificar = Vue.createApp({

});

const modificarMount = modificar.mount('#divModificar');