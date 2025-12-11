'use server';
/*
    En este archivo lo que realizamos son las peticiones a la base de datos para metodos CRUD con la tabla categorias
*/

import { Categoria } from '@/interface';
import { createClient } from '@/utils/supabase/server';

/*
        La primera funcion sirve para traer los categorias por el id de la rotiseria que le pasamos por parametros
        Consultamos en la tabla Categoria y seleccionamos todos los datos que tengan el id de la rotiseria

        is devuelve un error lo mostramos por pantallla y sino retornamos los datos
    */

export const startGetCategoriasByRotiseriaId = async (id: number): Promise<Categoria[] | []> => {
  const supabase = await createClient();
  console.log(id);
  try {
    const { data, error } = await supabase.from('Categoria').select().eq('rotiseriaId', id);

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
        En esta funcion pasamos por parametro la categoria y lo que hacemos es cargarla a la base de datos;

        Si existe algun error lo mostramos y devolvemos false y sino devolvemos true
    */

export const startPostCategoria = async (categoria: Categoria): Promise<boolean> => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('Categoria').insert(categoria);

    if (error) {
      return false;
    }

    return true;
  } catch (e: any) {
    return false;
  }
};

/*
        Para la funcion de actualizar categoria pasamos por parametro la categoria parcial ya que hay datos que no se modifican quisas y lo que hacemos es actualizarla en la base de datos;

        Si existe algun error lo mostramos y devolvemos false y sino devolvemos true
    */

export const startUpdateCategoria = async (categoria: Partial<Categoria>): Promise<boolean> => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('Categoria').update(categoria).eq('id', categoria.id);
    if (error) {
      return false;
    }

    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  }
};

/*
        Por ultimo Para eliminar una categoria pasamos por parametro el id de la categoria y lo que hacemos es eliminarla de la base de datos;

        Si existe algun error lo mostramos y devolvemos false y sino devolvemos true
    */

export const startDeleteCategoria = async (id: number): Promise<boolean> => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('Categoria').delete().eq('id', id);

    if (error) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
