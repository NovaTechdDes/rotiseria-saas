/*
    En este archivo lo que realizamos son las peticiones a la base de datos para metodos CRUD con la tabla categorias

    Cuando veamos SWAL lo que haremos es que en vez de usar console.log para mostrar los errores
    usaremos Swal.fire para mostrarlos en una alerta
*/

import { Categoria } from '@/interface';
import { supabase } from '@/lib/supabase';
import Swal from 'sweetalert2';

export const categoriasActions = () => {
  /*
        La primera funcion sirve para traer los categorias por el id de la rotiseria que le pasamos por parametros
        Consultamos en la tabla Categoria y seleccionamos todos los datos que tengan el id de la rotiseria

        is devuelve un error lo mostramos por pantallla y sino retornamos los datos
    */

  const startGetCategoriasByRotiseriaId = async (
    id: number
  ): Promise<Categoria[] | []> => {
    try {
      const { data, error } = await supabase
        .from('Categoria')
        .select()
        .eq('rotiseriaId', id);

      if (error) {
        await Swal.fire(
          'Error al obtener las categorias',
          error.message,
          'error'
        );

        return [];
      }

      return data;
    } catch (error: any) {
      console.log(error);
      await Swal.fire(
        'Error inesperado al obtener las categorias',
        error.message,
        'error'
      );
      return [];
    }
  };

  /*
        En esta funcion pasamos por parametro la categoria y lo que hacemos es cargarla a la base de datos;

        Si existe algun error lo mostramos y devolvemos false y sino devolvemos true
    */

  const startPostCategoria = async (categoria: Categoria): Promise<boolean> => {
    try {
      const { error } = await supabase.from('Categoria').insert(categoria);

      if (error) {
        await Swal.fire('Error al crear categoria', error.message, 'error');
        return false;
      }

      return true;
    } catch (e: any) {
      await Swal.fire(
        'Error inesperado al crear categoria',
        e.message || String(e),
        'error'
      );
      return false;
    }
  };

  /*
        Para la funcion de actualizar categoria pasamos por parametro la categoria parcial ya que hay datos que no se modifican quisas y lo que hacemos es actualizarla en la base de datos;

        Si existe algun error lo mostramos y devolvemos false y sino devolvemos true
    */

  const startUpdateCategoria = async (
    categoria: Partial<Categoria>
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('Categoria')
        .update(categoria)
        .eq('id', categoria.id);
      if (error) {
        await Swal.fire(
          'Error al actualizar categoria',
          error.message,
          'error'
        );
        return false;
      }

      return true;
    } catch (error: any) {
      await Swal.fire(
        'Error inesperado al crear categoria',
        error.message || String(error),
        'error'
      );
      return false;
    }
  };

  /*
        Por ultimo Para eliminar una categoria pasamos por parametro el id de la categoria y lo que hacemos es eliminarla de la base de datos;

        Si existe algun error lo mostramos y devolvemos false y sino devolvemos true
    */

  const startDeleteCategoria = async (id: number): Promise<boolean> => {
    try {
      const { error } = await supabase.from('Categoria').delete().eq('id', id);

      if (error) {
        await Swal.fire(
          'Error al eliminar la categoria',
          error.message,
          'error'
        );
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    startGetCategoriasByRotiseriaId,
    startPostCategoria,
    startUpdateCategoria,
    startDeleteCategoria,
  };
};
