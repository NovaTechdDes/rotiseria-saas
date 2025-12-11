'use server';
/*
    en este archivo se encarga de todas las acciones relacionadas con el tipo de egreso que realiza las peticions CRUD a la base de datos

    
*/
import { verificarError } from '@/helpers/erroresTipoEgreso';
import { TipoEgreso } from '@/interface';
import { createClient } from '@/utils/supabase/server';
/*
        En la primera funcion traemos los tipos de egresos de la rotiseria
        Nos devuelve un array de objetos con la informacion

        Si da un error devolvemos un false sino el array

        Tarea: Ver si sin el id de la rotiseria igual nos trae solamente de esa rotiseria
    */

export const startGetTipoEgreso = async (): Promise<TipoEgreso[] | { ok: boolean; msg: string }> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from('TipoEgreso').select();

    if (error) {
      return {
        ok: false,
        msg: 'Error al obtener los egresos',
      };
    }

    return data;
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      msg: 'Error inseperado al obtener los egresos',
    };
  }
};

/*
        En la segunda funcion agregamos un tipo de egreso a la rotiseria
        Nos devuelve true si lo agrega sino false

        Si da un error devolvemos un false sino true
    */
export const startPostTipoEgreso = async (tipoEgreso: TipoEgreso): Promise<{ ok: boolean; msg: string }> => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('TipoEgreso').insert(tipoEgreso);

    if (error) {
      return {
        ok: false,
        msg: 'error al Agregar Tipo Egreso',
      };
    }

    return {
      ok: true,
      msg: 'Tipo de egreso agregado correctamente',
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      msg: 'Error inseperado al agregar el tipo de egreso',
    };
  }
};

/*
        En la tercera funcion actualizamos un tipo de egreso de la rotiseria
        Nos devuelve true si lo actualiza sino false

        Si da un error devolvemos un false sino true
    */

export const startUpdateTipoEgreso = async (tipoEgreso: TipoEgreso): Promise<{ ok: boolean; msg: string }> => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('TipoEgreso').update(tipoEgreso).eq('id', tipoEgreso.id);

    if (error) {
      console.error(error);

      return {
        ok: false,
        msg: 'Error al actualizar el tipo de egreso',
      };
    }

    return {
      ok: true,
      msg: 'Tipo de egreso actualizado correctamente',
    };
  } catch (error: any) {
    console.error(error);

    return {
      ok: false,
      msg: 'Error inseperado al actualizar el tipo de egreso',
    };
  }
};

/*
        En la cuarta funcion eliminamos un tipo de egreso de la rotiseria
        Nos devuelve true si lo elimina sino false

        Si da un error devolvemos un false sino true

        Tarea: Preguntar a Juan si eliminamos realmente el tipo de egreso o si lo desactivamos
    */

export const startDeleteTipoEgreso = async (id: number): Promise<{ ok: boolean; msg: string }> => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('TipoEgreso').delete().eq('id', id);

    if (error) {
      console.error(error);
      return {
        ok: false,
        msg: verificarError(error.code),
      };
    }

    return {
      ok: true,
      msg: 'Tipo de egreso eliminado correctamente',
    };
  } catch (error: any) {
    console.error(error);

    return {
      ok: false,
      msg: 'Error inseperado al eliminar el tipo de egreso',
    };
  }
};
