/*
    Esta es la accion que se encarga de obtener la rotiseria para un dominio    Nos devuelve la rotiseria si la encuentra sino false

    Si da un error devolvemos un false sino la rotiseria
*/

import { Rotiseria } from '@/interface/Rotiseria';
import { supabase } from '@/lib/supabase';
import Swal from 'sweetalert2';

export const rotiseriasActions = () => {
  /*
    Aca lo que hacemos es pasarle un dominio al inicilaizar la aplicaicon y uscar una rotiseria por ese dominio y devolverla si la encuentra sino false
*/
  const startGetRotiseriaForDominio = async (
    dominio: string
  ): Promise<Rotiseria | false> => {
    try {
      const { data, error } = await supabase
        .from('Rotiseria')
        .select()
        .eq('dominio', dominio)
        .single();

      if (error) {
        await Swal.fire(
          'Error al obtener la rotiseria',
          error.message,
          'error'
        );
        return false;
      }

      return data;
    } catch (error: any) {
      await Swal.fire(
        'Error inesperado al obtener la rotiseria',
        error.message,
        'error'
      );
      return false;
    }
  };

  /*
        En esta accion se encarga de actualizar la rotiseria
        Nos devuelve true si la actualiza sino false

        Si da un error devolvemos un false sino true
    */
  const startUpdateRotiseria = async (rotiseria: Partial<Rotiseria>) => {
    try {
      const { data, error } = await supabase
        .from('Rotiseria')
        .update(rotiseria)
        .eq('id', rotiseria.id);

      if (error) {
        await Swal.fire(
          'Error al actualizar la rotiseria',
          error.message,
          'error'
        );
        return false;
      }

      return true;
    } catch (error: any) {
      await Swal.fire(
        'Error inesperado al actualizar la rotiseria',
        error.message,
        'error'
      );
      return false;
    }
  };

  return {
    startGetRotiseriaForDominio,
    startUpdateRotiseria,
  };
};
