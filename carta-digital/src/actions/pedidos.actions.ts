import { Pedido } from "@/interface";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

/*
    En este archivo se encuentran las acciones de los pedidos a la base de datos para metodos Crud

    Cuuando veamos Swal lo que haermos es mostrar un mensaje de error que surgio para informar al cliente

    

*/

export const pedidosActions = () => {

    /*
        En la primera funcion lo que hacemos es obtener todos los pedidos de la rotiseria, 
        para ello usamos el select de supabase para obtener todos los pedidos de la rotiseria
        y los movimientos de los productos que guardaron. Solo trae los pedidios que no fueron cancelados

        Si existe algun error lo mostramos y devolvemos un array vacio
    */

    const startGetPedidos = async (id: number): Promise<Pedido[] | []> => {
        try {

            const { data, error } = await supabase
                .from('Pedido')
                .select('*, movProductos:MovProducto(*)')
                .eq('rotiseriaId', id)
                .eq('mostrar', true)
                .order('created_at', { ascending: false });

            if (error) {
                await Swal.fire('Error al obtener los pedidos', error.message, 'error');
                return [];
            };

            return data;
        } catch (error: any) {
            console.log(error);
            await Swal.fire('Error inesperado al obtener los pedidos', error.message, 'error');
            return [];
        };
    };

    /*
        Para cargar un pedido lo pasamos por parametro y despues tenemos que buscar el usuario que esta logueado
        para obtener su id y luego insertar el pedido en la base de datos

        Luego en pedidos.productos traemos la lista de productos que se pidio y tenemos que guardarlo en la base de datos como movProductos para una posterior visualizacion
        Entonces para ello creamos un array de productos planos que solo tenga la informacion que necesitamos para insertar en la base de datos
        Luego llamamos a rpc (create_ventas_con_productos) que es el procedimiento almacenado que creamos en supabase el cual crea el pedido y los mov de produuctos todo juntos
        Si da un error lo mostramos y devolvemos false

        Si existe algun error lo mostramos y devolvemos false


        TAREA: Probar a insertar un pedido sin loguear que creo que lo hice mal, no necesita de un usuario porque sino cualquier cliente no podria instertar un pedido
    */

    const startPostPedido = async (pedido: Pedido): Promise<boolean> => {
        try {
            const { data: dataUser, error: errorUser } = await supabase.auth.getUser();

            if (errorUser) {
                console.log(errorUser);
                await Swal.fire('Error al obtener el usuario', errorUser?.message, 'error');
                return false;
            };

            const usuario = dataUser.user.id;
            const productosPlanos = pedido.productos?.map(item => ({
                cantidad: item.cantidad,
                precioUnitario: item.producto.precio,
                descripcion: item.producto.nombre,
                productoId: item.producto.id,
                rotiseriaId: item.producto.rotiseriaId
            }))

            const { error } = await supabase.rpc('create_ventas_con_productos', {
                'p_cliente': pedido.cliente,
                'p_total': pedido.total,
                'p_estado': pedido.estado,
                'p_telefono': pedido.telefono,
                'p_direccion': pedido.direccion,
                'p_envio': pedido.envio,
                'p_vuelto': pedido.vuelto,
                'p_observaciones': pedido.observaciones,
                'p_tipopago': pedido.tipoPago,
                'p_usuarioid': usuario,
                'p_rotiseriaid': pedido.rotiseriaId,
                'p_productos': productosPlanos
            });

            if (error) {
                console.log(error)
                await Swal.fire('Error al crear un pedido', error.message, 'error');
                return false;
            };

            return true;
        } catch (error: any) {
            await Swal.fire('Error inesperado al crear un pedido', error.message, 'error');
            return false
        }
    };

    /*
        En esta funcion pasamos por parametro el pedido parcial ya que hay datos que no se modifican quisas y lo que hacemos es actualizarla en la base de datos;

        Si existe algun error lo mostramos y devolvemos false y sino devolvemos true
    */

    const startUpdatePedido = async (pedido: Partial<Pedido>): Promise<boolean> => {
        try {
            const { movProductos, ...pedidoSinMov } = pedido
            console.log(movProductos)
            const { error } = await supabase.from('Pedido').update(pedidoSinMov).eq('id', pedido.id);

            if (error) {
                await Swal.fire('Error al actualizar el pedido', error.message, 'error');
                return false;
            }
            return true
        } catch (error: any) {
            console.log(error);
            await Swal.fire('Error inesperado al actualizar pedido', error.message, 'error');
            return false;
        }
    };

    /*
        En esta funcion para eliminar el pedido en realidad no lo eliminamos de la base de datos
        sino que lo marcamos como no mostrar para que no aparezca visualmente

        Si existe algun error lo mostramos y devolvemos false y sino devolvemos true
    */

    const startDeletePedido = async (id: number): Promise<boolean> => {
        try {
            const { error } = await supabase.from('Pedido').update({ mostrar: false }).eq('id', id);

            if (error) {
                await Swal.fire('Error al eliminar el porducto', error.message, 'error');
                return false;
            };
            return true;
        } catch (error: any) {
            console.log(error);
            await Swal.fire('Error inesperado al eliminar producto', error.message, 'error');
            return false;
        };
    };

    return {
        startGetPedidos,
        startPostPedido,
        startUpdatePedido,
        startDeletePedido
    };
};