/*
    Esta es la accion que se encarga de obtener la rotiseria para un dominio    Nos devuelve la rotiseria si la encuentra sino false

    Si da un error devolvemos un false sino la rotiseria
*/

import { Rotiseria } from '@/interface/Rotiseria';
import { supabase } from '@/lib/supabase';
import Swal from 'sweetalert2';

/*
    Aca lo que hacemos es pasarle un dominio al inicilaizar la aplicaicon y uscar una rotiseria por ese dominio y devolverla si la encuentra sino false
*/
export const startGetRotiseriaForDominio = async (dominio: string): Promise<Rotiseria | null> => {
  try {
    const { data, error } = await supabase.from('Rotiseria').select().eq('dominio', dominio).single();

    if (error) {
      return null;
    }

    return data;
  } catch (error: any) {
    return null;
  }
};

/*
        En esta accion se encarga de actualizar la rotiseria
        Nos devuelve true si la actualiza sino false

        Si da un error devolvemos un false sino true
    */
export const startUpdateRotiseria = async (rotiseria: Partial<Rotiseria>) => {
  try {
    const { data, error } = await supabase.from('Rotiseria').update(rotiseria).eq('id', rotiseria.id);

    if (error) {
      await Swal.fire('Error al actualizar la rotiseria', error.message, 'error');
      return false;
    }

    return true;
  } catch (error: any) {
    await Swal.fire('Error inesperado al actualizar la rotiseria', error.message, 'error');
    return false;
  }
};
