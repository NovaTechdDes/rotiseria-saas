import { Producto } from "@/interface";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export const productsActions = () => {

    const startGetProductosByRotiseriaId = async (id: number): Promise<Producto[] | []> => {
        try {
            const { error, data } = await supabase.from('Producto').select('*, Categoria(id, nombre)').eq('rotiseriaId', id);
            console.log(data)
            if (error) {
                await Swal.fire('Error al obtener los productos', error.message, 'error');
                return [];
            };

            return data;
        } catch (error: any) {
            await Swal.fire('Error inesperado al obtener los productos', error.message, 'error');
            return [];
        };
    };

    const startPostProducto = async (producto: Producto): Promise<boolean> => {

        try {
            const { error } = await supabase.from('Producto').insert(producto);

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
            const { error } = await supabase.from('Producto').update(producto).eq('id', producto.id);
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
            const { error } = await supabase.from('Producto').delete().eq('id', id);
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
        startGetProductosByRotiseriaId,
        startPostProducto,
        startUpdateProducto
    };
};