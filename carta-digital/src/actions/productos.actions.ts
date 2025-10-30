import { Producto } from "@/interface";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export const productsActions = () => {

    const startGetProductos = async (): Promise<Producto[] | false> => {
        try {
            const { error, data } = await supabase.from('producto').select();

            if (error) {
                await Swal.fire('Error al obtener los productos', error.message, 'error');
                return false;
            };

            return data;
        } catch (error: any) {
            await Swal.fire('Error inesperado al obtener los productos', error.message, 'error');
            return false;
        };
    };

    const startPostProducto = async (producto: Producto): Promise<boolean> => {

        try {
            const { error } = await supabase.from('producto').insert(producto);

            if (error) {
                await Swal.fire('Error al crear el producto', error.message, 'error');
                return false;
            };

            return true;
        } catch (error: any) {
            console.log(error);
            await Swal.fire('Error inesperado al crear el producto', error.message, 'error')
            return false;
        }

    };

    const startUpdateProducto = async (producto: Partial<Producto>): Promise<boolean> => {
        try {
            const { error } = await supabase.from('producto').update(producto).eq('id', producto.id);
            if (error) {
                await Swal.fire('Error al actualizar el producto', error.message, 'error');
                return false;
            }
            return true;
        } catch (error: any) {
            await Swal.fire('Error inesperado al actualizar el producto', error.message, 'error');
            return false;
        }
    };

    const startDeleteProducto = async (id: number): Promise<boolean> => {
        try {
            const { error } = await supabase.from('producto').delete().eq('id', id);
            if (error) {
                await Swal.fire('Error al eliminar el producto', error.message, 'error');
                return false;
            }
            return true;
        } catch (error: any) {
            await Swal.fire('Error inesperado al eliminar el producto', error.message, 'error');
            return false;
        }
    };

    return {
        startDeleteProducto,
        startGetProductos,
        startPostProducto,
        startUpdateProducto
    };
};