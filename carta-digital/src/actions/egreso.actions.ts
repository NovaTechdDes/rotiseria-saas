'use server';
import { Egreso } from '@/interface';
import { createClient } from '@/utils/supabase/server';

//Funcion principal que exporta las funciones individuales de cada metodo
/*
        Esta funcion recibe dos parametros de fechas desde y hasta para luego hacer una consulta a la base de datos para obtener los 
        egresos que esten entre esas dos fechas, como las fechas viene en tipo string lo que hacemos es transformarlas a tipo Date

        Ademas el select trae todos los campos y los campos del tipoEgresoId asociado y lo renombramos como TipoEgreso

        TipoEgreso es un objeto del tipo {
            id: id perteneciente
            nombre: un texto
            created_at: Fecha de creacion
            rotiseriaId: Id a la rotiseria que pertenece
        }

        Este Tipo de egreso es una tabla que esta asociado con una clave foreana
    */
export const startGetEgresos = async (desde: string, hasta: string): Promise<Egreso[]> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('Egreso')
      .select('*, TipoEgreso:tipoEgresoId(*)')
      .gte('created_at', `${desde}T00:00:00+00:00`)
      .lte('created_at', `${hasta}T23:59:59+00:00`)
      .eq('mostrar', true);

    if (error) {
      return [];
    }

    return data;
  } catch (error: any) {
    console.error(error);
    return [];
  }
};

/*
        Para crear un egreso obtenesmo el egreso por un parametro de la funcion. Luego lo que hacemos con supabase.auth.getUser() es 
        obtener el usuario para agregarlo al egreso.usuarioId y saber que usuario creo ese egreso

        Luego simplemente insertamos el egreso y si va todo bien retornamos true, sino un false
    */

export const startPostEgreso = async (egreso: Egreso): Promise<{ ok: boolean; msg?: string }> => {
  const supabase = await createClient();
  const { data: user, error: errorUser } = await supabase.auth.getUser();

  if (errorUser) {
    return {
      ok: false,
      msg: 'Error al obtener el usuario',
    };
  }

  egreso.usuarioId = Number(user.user.id);

  try {
    const { error } = await supabase.from('Egreso').insert(egreso);

    if (error) {
      return {
        ok: false,
        msg: 'Error al obtener el usuario',
      };
    }

    return {
      ok: true,
      msg: 'Egreso creado correctamente',
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      msg: 'Error inesperado al obtener el usuario',
    };
  }
};

/*
        Para actaulizar el egreso lo que hacemos es obtener un egreso parcial por eso es :Partial<Egreso> y no :Egreso directamente
        y lo modificamos en supabase comparando que el id sea igual al egreso.id en eq('id', egreso.id);

        TAREA: Colocar el id del usuario que lo actualizo
    */
export const startUpdateEgreso = async (egreso: Partial<Egreso>): Promise<{ ok: boolean; msg: string }> => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('Egreso').update(egreso).eq('id', egreso.id);
    if (error) {
      return {
        ok: false,
        msg: 'Error al actualizar el egreso',
      };
    }

    return {
      ok: true,
      msg: 'Egreso actualizado correctamente',
    };
  } catch (error: any) {
    console.error(error);

    return {
      ok: false,
      msg: 'Error inserperado al actualizar el egreso',
    };
  }
};

/*
        Para eliminar un egreso necesitamos el id que nos biene como parametro del tipo number,
        lo eliminamos comparando el id con eq('id', id), si todo va bien retornamos true, sino false

        Nunca eliminamos un egreso, sino que directamente lo que hacemos es no mostrarlo
    */
export const startDeleteEgreso = async (id: number): Promise<{ ok: boolean; msg?: string }> => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('Egreso').update({ mostrar: false }).eq('id', id);

    if (error) {
      return {
        ok: false,
        msg: 'Error inesperado al eliminar el egreso',
      };
    }
    return {
      ok: true,
      msg: 'Egreso eliminado correctamente',
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      msg: 'Error inesperado al eliminar el egreso',
    };
  }
};
