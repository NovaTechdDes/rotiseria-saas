/*
    Esta carpeta tiene las funciones de conexion a la base de datos con cada tabla que pertence
    es decir, cada archivo es una tabla y tiene los principales metodos CRUD ademas de alguna funcion especifica.

    Estas funciones son utilizadas por los arhcivos de la carpeta hooks

    En el archvio egreso.actions.ts esta documentado el codigo, los demas son parecidos
*/

export * from './categorias.actions';
export * from './egreso.actions';
export * from './pedidos.actions';
export * from './productos.actions';
export * from './rotiserias.actions';
export * from './tipoEgreso.actions';
export * from './auth.actions';
export * from './reportes.actions';
