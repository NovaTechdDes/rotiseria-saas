
/*
    en este archivo se encarga de todas las acciones relacionadas con el tipo de egreso que realiza las peticions CRUD a la base de datos

    Si vemos Swal.fire es un carte para informar que algo no salio bien
*/
import { verificarError } from "@/helpers/erroresTipoEgreso";
import { TipoEgreso } from "@/interface";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export const tipoEgresosActions = () => {

    /*
        En la primera funcion traemos los tipos de egresos de la rotiseria
        Nos devuelve un array de objetos con la informacion

        Si da un error devolvemos un false sino el array

        Tarea: Ver si sin el id de la rotiseria igual nos trae solamente de esa rotiseria
    */

    const startGetTipoEgreso = async (): Promise<TipoEgreso[]> => {

        try {
            const { data, error } = await supabase.from('TipoEgreso').select();

            if (error) {
                await Swal.fire('Error al obtener los tipos de categorias', error.message, 'error');
                return [];
            };

            return data;
        } catch (error: any) {

            await Swal.fire('Error inesperadod al agregar categoria', error.message, 'error')
            return [];
        };


    };

    /*
        En la segunda funcion agregamos un tipo de egreso a la rotiseria
        Nos devuelve true si lo agrega sino false

        Si da un error devolvemos un false sino true
    */
    const startPostTipoEgreso = async (tipoEgreso: TipoEgreso): Promise<boolean> => {

        try {
            const { error } = await supabase.from('TipoEgreso').insert(tipoEgreso);

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

    /*
        En la tercera funcion actualizamos un tipo de egreso de la rotiseria
        Nos devuelve true si lo actualiza sino false

        Si da un error devolvemos un false sino true
    */

    const startUpdateTipoEgreso = async (tipoEgreso: TipoEgreso): Promise<boolean> => {
        try {
            const { error } = await supabase.from('TipoEgreso').update(tipoEgreso).eq('id', tipoEgreso.id);

            if (error) {
                console.log(error)
                await Swal.fire('Error al modificar Tipo Egreso', error.message, 'error');
                return false;
            };

            return true;
        } catch (error: any) {
            console.log(error)
            await Swal.fire('Error inesperdao al modificar el Tipo Egreso', error.message, 'error');
            return false
        };
    };

    /*
        En la cuarta funcion eliminamos un tipo de egreso de la rotiseria
        Nos devuelve true si lo elimina sino false

        Si da un error devolvemos un false sino true

        Tarea: Preguntar a Juan si eliminamos realmente el tipo de egreso o si lo desactivamos
    */

    const startDeleteTipoEgreso = async (id: number): Promise<boolean> => {

        try {

            const { error } = await supabase.from('TipoEgreso').delete().eq('id', id);

            if (error) {
                await Swal.fire('Error al eliminar el tipo Egreso', verificarError(error.code), 'error');
                console.log(error)
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