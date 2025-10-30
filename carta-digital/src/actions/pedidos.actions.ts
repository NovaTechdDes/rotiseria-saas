import { Pedido } from "@/interface";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export const pedidosActions = () => {

    const startGetPedidos = async (): Promise<Pedido[] | false> => {
        try {

            const { data, error } = await supabase.from('pedido').select();

            if (error) {
                await Swal.fire('Error al obtener los pedidos', error.message, 'error');
                return false;
            };

            return data;
        } catch (error: any) {
            console.log(error);
            await Swal.fire('Error inesperado al obtener los pedidos', error.message, 'error');
            return false;
        };
    };

    const startPostPedido = async (pedido: Pedido): Promise<boolean> => {
        try {
            const { error } = await supabase.from('peddio').insert(pedido);

            if (error) {
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
            const { error } = await supabase.from('peidido').update(pedido).eq('id', pedido.id);

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
            const { error } = await supabase.from('pedido').delete().eq('id', id);

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