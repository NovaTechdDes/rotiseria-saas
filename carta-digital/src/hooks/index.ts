/*
    Esta carpeta define los hooks que vamos a utilizar, generalmente llamado desde los compenetes para traer 
    la informacion de la base de datos, cuando Veamos use segido del nombre de la tabla lo que hace es llamar a la funcion get de cada tabla
    definida en los archivos actions

    Lo que hacemos en estos archivos es utilizar la libreria Tanstackquery poniendole claves al query y llamar a la funcion donde tambien
    le ponemos un tiempo de actualizacion.

    useMutate y el nombre de la tabla estan definidas las funcones para poder modificar esas tabla ya sea con POST, PUT o DELETE
    y luego lo que hace es reiniciar el el query con las claves para poder actualizar los GETS

    Por ultimo tenemos una funcion Use Form Sacada de  un curso, sirve para manejar perfectamente los formularios
    por ejemplo cuando agreguemos un producto vamos a tener forumaliros con inputs del tipo texto, numero, imagen, el use form los ayuda
    a manejar esto de una mejor forma.

    IMPORTANTE: Tanstackquery es una libreria que nos ayuda a no realizar tantas peticiones https a la base de datos, 
    ademas de manejar estados de las tablas

    En egreso vamos a ver documentado el codigo en los dos archivos, para ver bien que hacen
*/


export * from './categorias/useMutateCategoria';
export * from './categorias/useCategorias';

export * from './egresos/useEgresos';
export * from './egresos/useMutateEgresos';

export * from './pedidos/useMutatePedidos';
export * from './pedidos/usePedidos';

export * from './productos/useMutateProductos';
export * from './productos/useProductos';

export * from './reportes/useReportesForDate';
export * from './reportes/useReportesMostPopularProducto';
export * from './reportes/useReportesTipoPagosPedidos';

export * from './rotiserias/useRotiseriaByDominio';
export * from './rotiserias/useMutateRotiseria';

export * from './tipoEgresos/useMutateTipoEgresos';
export * from './tipoEgresos/useTipoEgresos';

//TAREA: falta realizar varios ajustes a los metodos CRUD de usuario
export * from './usuarios/useMutateUsuarios';

export * from './auth/useAuth';
export * from './auth/useUsuarios';

export * from './useForm';