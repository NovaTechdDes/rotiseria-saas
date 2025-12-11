import { Egreso } from '@/interface';
import { supabase } from '@/lib/supabase';
import Swal from 'sweetalert2';

//Funcion principal que exporta las funciones individuales de cada metodo

//Cuando veamos await Swal.fire() es un mensaje de alerta que se le muestra al usuario de que algo no anda bien

export const egresoActions = () => {
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
  const startGetEgresos = async (desde: string, hasta: string): Promise<Egreso[]> => {
    try {
      const { data, error } = await supabase.from('Egreso').select('*, TipoEgreso:tipoEgresoId(*)').gte('created_at', `${desde}T00:00:00+00:00`).lte('created_at', `${hasta}T23:59:59+00:00`);

      if (error) {
        await Swal.fire('Error al obtener los egreso', error.message, 'error');
        return [];
      }

      return data;
    } catch (error: any) {
      await Swal.fire('Error inserperado al obtener los egreos', error.message, 'error');
      return [];
    }
  };

  /*
        Para crear un egreso obtenesmo el egreso por un parametro de la funcion. Luego lo que hacemos con supabase.auth.getUser() es 
        obtener el usuario para agregarlo al egreso.usuarioId y saber que usuario creo ese egreso

        Luego simplemente insertamos el egreso y si va todo bien retornamos true, sino un false
    */

  const startPostEgreso = async (egreso: Egreso): Promise<boolean> => {
    const { data: user, error: errorUser } = await supabase.auth.getUser();

    if (errorUser) {
      await Swal.fire('Error al obtener el usuario', errorUser.message, 'error');
      return false;
    }

    egreso.usuarioId = Number(user.user.id);

    try {
      const { error } = await supabase.from('Egreso').insert(egreso);

      if (error) {
        await Swal.fire('Error al cargar el egreso', error.message, 'error');
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /*
        Para actaulizar el egreso lo que hacemos es obtener un egreso parcial por eso es :Partial<Egreso> y no :Egreso directamente
        y lo modificamos en supabase comparando que el id sea igual al egreso.id en eq('id', egreso.id);

        TAREA: Colocar el id del usuario que lo actualizo
    */
  const startUpdateEgreso = async (egreso: Partial<Egreso>): Promise<boolean> => {
    try {
      const { error } = await supabase.from('Egreso').update(egreso).eq('id', egreso.id);
      if (error) {
        await Swal.fire('Error al actualizar el egreso', error.message, 'error');
        return false;
      }

      return true;
    } catch (error: any) {
      console.error(error);
      await Swal.fire('Error inesperado al actualizar el egreso', error.message, 'error');
      return false;
    }
  };

  /*
        Para eliminar un egreso necesitamos el id que nos biene como parametro del tipo number,
        lo eliminamos comparando el id con eq('id', id), si todo va bien retornamos true, sino false

        Nunca eliminamos un egreso, sino que directamente lo que hacemos es no mostrarlo
    */
  const startDeleteEgreso = async (id: number): Promise<boolean> => {
    try {
      const { error } = await supabase.from('Egreso').update({ mostrar: false }).eq('id', id);

      if (error) {
        await Swal.fire('Error al eliminar el egreso', error.message, 'error');
        return false;
      }
      return true;
    } catch (error: any) {
      await Swal.fire('Error inesperado al eliminar el egreso', error.message, 'error');
      return false;
    }
  };

  return {
    startDeleteEgreso,
    startGetEgresos,
    startPostEgreso,
    startUpdateEgreso,
  };
};
