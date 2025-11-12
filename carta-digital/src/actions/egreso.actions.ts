import { Egreso } from "@/interface";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export const egresoActions = () => {

    const startGetEgresos = async (desde: string, hasta: string): Promise<Egreso[]> => {

        try {
            const { data, error } = await supabase
                .from('Egreso')
                .select('*, TipoEgreso:tipoEgresoId(*)')
                .gte('created_at', `${desde}T00:00:00+00:00`)
                .lte('created_at', `${hasta}T23:59:59+00:00`);

            if (error) {
                await Swal.fire('Error al obtener los egreso', error.message, 'error');
                return [];
            };

            return data;

        } catch (error: any) {
            await Swal.fire('Error inserperado al obtener los egreos', error.message, 'error');
            return [];
        };
    };

    const startPostEgreso = async (egreso: Egreso): Promise<boolean> => {

        const { data: user, error: errorUser } = await supabase.auth.getUser();

        if (errorUser) {
            await Swal.fire('Error al obtener el usuario', errorUser.message, 'error');
            return false;
        };

        egreso.usuarioId = user.user.id;

        try {
            const { error } = await supabase.from('Egreso').insert(egreso);

            if (error) {
                await Swal.fire('Error al cargar el egreso', error.message, 'error');
                return false;
            }

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };


    const startUpdateEgreso = async (egreso: Partial<Egreso>): Promise<boolean> => {
        try {
            const { error } = await supabase.from('Egreso').update(egreso).eq('id', egreso.id);
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
            const { error } = await supabase.from('Egreso').delete().eq('id', id);

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