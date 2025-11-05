import { Categoria } from "@/interface";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";
import { userAuthenticated } from "./auth.actions";

export const categoriasActions = () => {

    const startGetCategoriasByRotiseriaId = async (id: number): Promise<Categoria[] | []> => {
        console.log(id)
        const { data, error } = await supabase.from('Categoria').select().eq('rotiseriaId', id);

        if (error) {
            await Swal.fire('Error al obtener las categorias', error.message, 'error');

            return [];
        };

        return data;
    };

    const startPostCategoria = async (categoria: Categoria): Promise<boolean> => {
        try {
            const { error } = await supabase.from('Categoria').insert(categoria);

            if (error) {
                await Swal.fire('Error al crear categoria', error.message, 'error');
                return false;
            }

            return true;
        } catch (e: any) {
            await Swal.fire('Error inesperado al crear categoria', e.message || String(e), 'error');
            return false;
        }
    };

    const startUpdateCategoria = async (categoria: Partial<Categoria>): Promise<boolean> => {
        try {
            const { error } = await supabase.from('Categoria').update(categoria).eq('id', categoria.id);
            if (error) {
                await Swal.fire('Error al actualizar categoria', error.message, 'error');
                return false;
            };

            return true;
        } catch (error: any) {
            await Swal.fire('Error inesperado al crear categoria', error.message || String(error), 'error');
            return false;
        }
    };

    const startDeleteCategoria = async (id: number): Promise<boolean> => {
        try {
            const { data, error } = await supabase.from('Categoria').delete().eq('id', id);

            if (error) {
                await Swal.fire('Error al eliminar la categoria', error.message, 'error');
                return false;
            };

            return true

        } catch (error) {
            console.log(error);
            return false
        }
    };

    return {
        startGetCategoriasByRotiseriaId,
        startPostCategoria,
        startUpdateCategoria,
        startDeleteCategoria

    }
};