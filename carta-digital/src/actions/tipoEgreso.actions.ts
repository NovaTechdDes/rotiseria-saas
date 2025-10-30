
import { TipoEgreso } from "@/interface";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export const tipoEgresosActions = () => {

    const startGetTipoEgreso = async (): Promise<TipoEgreso[] | false> => {

        try {
            const { data, error } = await supabase.from('tipoEgreso').select();

            if (error) {
                await Swal.fire('Error al obtener los tipos de categorias', error.message, 'error');
                return false;
            };

            return data;
        } catch (error: any) {

            await Swal.fire('Error inesperadod al agregar categoria', error.message, 'error')
            return false;
        };


    };

    const startPostTipoEgreso = async (tipoEgreso: TipoEgreso): Promise<boolean> => {

        try {
            const { error } = await supabase.from('tipoEgreso').insert(tipoEgreso);

            if (error) {
                await Swal.fire('Errro al cargar Tipo de Egreso', error.message, 'error');
                return false;
            }

            return true;
        } catch (error: any) {

            await Swal.fire('Error inesperadod al agregar categoria', error.message, 'error')
            return false
        }
    };

    const startUpdateTipoEgreso = async (tipoEgreso: TipoEgreso): Promise<boolean> => {
        try {
            const { error } = await supabase.from('tipoEgreso').update(tipoEgreso).eq('id', tipoEgreso.id);

            if (error) {
                await Swal.fire('Error al modificar Tipo Egreso', error.message, 'error');
                return false;
            };

            return true;
        } catch (error: any) {
            await Swal.fire('Error inesperdao al modificar el Tipo Egreso', error.message, 'error');
            return false
        };
    };

    const startDeleteTipoEgreso = async (id: number): Promise<boolean> => {

        try {

            const { error } = await supabase.from('tipoEgreso').delete().eq('id', id);

            if (error) {
                await Swal.fire('Error al eliminar el tipo Egreso', error.message, 'error');
                return false;
            };

            return true;

        } catch (error: any) {
            console.log(error);
            await Swal.fire('Error inesperado al eliminar el Tipo de egreso', error.message, 'error');
            return false;
        };

    };

    return {
        startGetTipoEgreso,
        startPostTipoEgreso,
        startDeleteTipoEgreso,
        startUpdateTipoEgreso
    };
};