import { Rotiseria } from "@/interface/Rotiseria"
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export const rotiseriasActions = () => {
    const startGetRotiseriaForDominio = async (dominio: string): Promise<Rotiseria | false> => {
        try {
            const { data, error } = await supabase.from('Rotiseria').select().eq('dominio', dominio).single();

            if (error) {
                await Swal.fire('Error al obtener la rotiseria', error.message, 'error');
                return false;
            };

            return data;
        } catch (error: any) {
            await Swal.fire('Error inesperado al obtener la rotiseria', error.message, 'error');
            return false;
        };
    };

    const startUpdateRotiseria = async (rotiseria: Partial<Rotiseria>) => {
        try {
            const { data, error } = await supabase.from('Rotiseria').update(rotiseria).eq('id', rotiseria.id);

            if (error) {
                await Swal.fire('Error al actualizar la rotiseria', error.message, 'error');
                return false;
            };

            return true;
        } catch (error: any) {
            await Swal.fire('Error inesperado al actualizar la rotiseria', error.message, 'error');
            return false;
        };
    };

    return {
        startGetRotiseriaForDominio,
        startUpdateRotiseria,
    };
}