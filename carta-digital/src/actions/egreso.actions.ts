import { Egreso } from "@/interface";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export const egresoActions = () => {

    const startGetEgresos = async (): Promise<Egreso[] | false> => {
        try {
            const { data, error } = await supabase.from('egreso').select();

            if (error) {
                await Swal.fire('Error al obtener los egreso', error.message, 'error');
                return false;
            };

            return data;

        } catch (error: any) {
            await Swal.fire('Error inserperado al obtener los egreos', error.message, 'error');
            return false;
        };
    };

    const startPostEgreso = async (egreso: Egreso): Promise<boolean> => {

        try {
            const { error } = await supabase.from('egreso').insert(egreso);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };


    const startUpdateEgreso = async (egreso: Partial<Egreso>): Promise<boolean> => {
        try {
            const { error } = await supabase.from('egreso').update(egreso).eq('id', egreso.id);
            if (error) {
                await Swal.fire('Error al actualizar el egreso', error.message, 'error');
                return false;
            };

            return true
        } catch (error: any) {
            console.log(error);
            await Swal.fire('Error inesperado al actualizar el egreso', error.message, 'error');
            return false;
        };
    };

    const startDeleteEgreso = async (id: number): Promise<boolean> => {
        try {
            const { error } = await supabase.from('egreso').delete().eq('id', id);

            if (error) {
                await Swal.fire('Error al eliminar el egreso', error.message, 'error')
                return false;
            };
            return true;
        } catch (error: any) {
            await Swal.fire('Error inesperado al eliminar el egreso', error.message, 'error');
            return false;
        };
    };

    return {
        startDeleteEgreso,
        startGetEgresos,
        startPostEgreso,
        startUpdateEgreso
    }
};