import { Pedido, Producto } from "@/interface";
import { supabase } from "@/lib/supabase";
import { useRotiseriaStore } from "@/store";
import Swal from "sweetalert2";

export const pedidosActions = () => {

    const startGetPedidos = async (id: number): Promise<Pedido[] | []> => {
        try {

            const { data, error } = await supabase.from('Pedido').select().eq('rotiseriaId', id);

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

    const startPostPedido = async (pedido: Pedido, productos: Producto[]): Promise<boolean> => {
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
                productoId: item.producto.id,
                rotiseriaId: item.producto.rotiseriaId
            }))

            const { data, error } = await supabase.rpc('create_ventas_con_productos', {
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

    const startUpdatePedido = async (pedido: Partial<Pedido>): Promise<boolean> => {
        try {
            const { error } = await supabase.from('Pedido').update(pedido).eq('id', pedido.id);

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

    const startDeletePedido = async (id: number): Promise<boolean> => {
        try {
            const { error } = await supabase.from('Pedido').delete().eq('id', id);

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