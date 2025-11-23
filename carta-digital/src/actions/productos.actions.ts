/*
    En este arhcivo vamos a ejecutar las peticiones CRUD  a la base de datos de supabase

    Cuando veamos Swal lo que haermos es mostrar un mensaje de error que surgio para informar al cliente
*/

import { Producto } from '@/interface';
import { supabase } from '@/lib/supabase';
import Swal from 'sweetalert2';

export const productsActions = () => {
  /*
        En la primera funcion vamos a obtener los productos de rotirias con el id que nos pasaron por parametro

        lo que hacemos es buscar esos productos en la base de datos y traerlos con la categoria a la que pertenecen

        Si existe algun error lo mostramos y devolvemos un array vacio
    */

  const startGetProductosByRotiseriaId = async (
    id: number
  ): Promise<Producto[] | []> => {
    try {
      const { error, data } = await supabase
        .from('Producto')
        .select('*, Categoria(id, nombre)')
        .eq('rotiseriaId', id);

      if (error) {
        await Swal.fire(
          'Error al obtener los productos',
          error.message,
          'error'
        );
        return [];
      }

      return data;
    } catch (error: any) {
      await Swal.fire(
        'Error inesperado al obtener los productos',
        error.message,
        'error'
      );
      return [];
    }
  };

  /*
        En la segunda funcion vamos a insertar un nuevo producto

        lo que hacemos es insertar el producto en la base de datos y subir la imagen al storage de supabase

        Si existe algun error lo mostramos y devolvemos false
    */

  const startPostProducto = async (producto: Producto): Promise<boolean> => {
    try {
      let imagen = '';
      if (producto.imagenFile) {
        const { data, error: errorPostImage } = await supabase.storage
          .from('productos')
          .upload(
            `${Date.now()}-${producto?.imagenFile.name}`,
            producto.imagenFile
          );
        if (errorPostImage) {
          await Swal.fire(
            'Error al subir imagen',
            errorPostImage.message,
            'error'
          );
          return false;
        }

        const { data: publicURL } = await supabase.storage
          .from('productos')
          .getPublicUrl(data.path);
        imagen = publicURL.publicUrl;
      }
      const { imagenFile, ...productoSinFile } = producto;

      const { error } = await supabase.from('Producto').insert({
        ...productoSinFile,
        imagen: imagen,
      });

      if (error) {
        await Swal.fire('Error al crear el producto', error.message, 'error');
        return false;
      }
      return true;
    } catch (error: any) {
      console.log(error);
      await Swal.fire(
        'Error inesperado al crear el producto',
        error.message,
        'error'
      );
      return false;
    }
  };

  /*
        En la tercera funcion vamos a actualizar un producto

        lo que hacemos es actualizar el producto en la base de datos

        Si existe algun error lo mostramos y devolvemos false

        TAREA: Eliminar la imagen anterior si tiene y guardar la nueva si es que vino tambien
    */

  const startUpdateProducto = async (
    producto: Partial<Producto>
  ): Promise<boolean> => {
    try {
      const { Categoria, ...productoSinCategoria } = producto;
      const { error } = await supabase
        .from('Producto')
        .update(productoSinCategoria)
        .eq('id', producto.id);
      if (error) {
        await Swal.fire(
          'Error al actualizar el producto',
          error.message,
          'error'
        );
        return false;
      }
      return true;
    } catch (error: any) {
      await Swal.fire(
        'Error inesperado al actualizar el producto',
        error.message,
        'error'
      );
      return false;
    }
  };

  /*
        En la cuarta funcion vamos a eliminar un producto

        lo que hacemos es eliminar el producto de la base de datos

        Si existe algun error lo mostramos y devolvemos false

        Tarea: Preguntar a Juan si realmente tenemos que eliminar los productos
    */

  const startDeleteProducto = async (id: number): Promise<boolean> => {
    try {
      const { error } = await supabase.from('Producto').delete().eq('id', id);
      if (error) {
        await Swal.fire(
          'Error al eliminar el producto',
          error.message,
          'error'
        );
        return false;
      }
      return true;
    } catch (error: any) {
      await Swal.fire(
        'Error inesperado al eliminar el producto',
        error.message,
        'error'
      );
      return false;
    }
  };

  return {
    startDeleteProducto,
    startGetProductosByRotiseriaId,
    startPostProducto,
    startUpdateProducto,
  };
};
