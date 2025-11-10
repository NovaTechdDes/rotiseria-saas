import { supabase } from "@/lib/supabase"
import Swal from "sweetalert2";

export const loginSupabase = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            await Swal.fire('Error al loguearse', error.message, 'error');
            return false;
        };
        return data.session;
    } catch (error: any) {
        console.log(error)
        await Swal.fire('Error inseperado al loguearse', error.message, 'error');
        return false;
    }
};


export const userAuthenticated = async () => {
    try {
        const { data } = await supabase.auth.getUser();

        const { data: user } = await supabase.from('usuario').select().single();
        return user
    } catch (error: any) {
        console.log(error);
        await Swal.fire('Error inesperado al obtener el usuario', error.message, 'error');
    };
}