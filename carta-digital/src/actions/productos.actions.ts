'use server';
/*
    En este arhcivo vamos a ejecutar las peticiones CRUD  a la base de datos de supabase

    Cuando veamos Swal lo que haermos es mostrar un mensaje de error que surgio para informar al cliente
*/

import { Producto } from '@/interface';
import { createClient } from '@/utils/supabase/server';
/*
        En la primera funcion vamos a obtener los productos de rotirias con el id que nos pasaron por parametro

        lo que hacemos es buscar esos productos en la base de datos y traerlos con la categoria a la que pertenecen

        Si existe algun error lo mostramos y devolvemos un array vacio
    */

export const startGetProductosByRotiseriaId = async (id: number): Promise<Producto[] | []> => {
  const supabase = await createClient();
  try {
    const { error, data } = await supabase.from('Producto').select('*, Categoria(id, nombre)').eq('rotiseriaId', id);

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
        En la segunda funcion vamos a insertar un nuevo producto

        lo que hacemos es insertar el producto en la base de datos y subir la imagen al storage de supabase

        Si existe algun error lo mostramos y devolvemos false
    */

export const startPostProducto = async (producto: Producto): Promise<boolean> => {
  const supabase = await createClient();
  try {
    let imagen = '';
    if (producto.imagenFile) {
      const { data, error: errorPostImage } = await supabase.storage.from('productos').upload(`${Date.now()}-${producto?.imagenFile.name}`, producto.imagenFile);
      if (errorPostImage) {
        return false;
      }

      const { data: publicURL } = await supabase.storage.from('productos').getPublicUrl(data.path);
      imagen = publicURL.publicUrl;
    }
    const { imagenFile, ...productoSinFile } = producto;

    const { data, error } = await supabase.from('Producto').insert({
      ...productoSinFile,
      imagen: imagen,
    });
    console.log({ data, error });

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
        En la tercera funcion vamos a actualizar un producto

        lo que hacemos es actualizar el producto en la base de datos

        Si existe algun error lo mostramos y devolvemos false

    */

export const startUpdateProducto = async (producto: Partial<Producto>): Promise<boolean> => {
  const supabase = await createClient();
  try {
    const { Categoria, imagenFile, ...productoSinCategoria } = producto;
    let imagenNueva = '';
    //Eliminaos la iomagen anterior

    if (imagenFile) {
      if (productoSinCategoria.imagen) {
        const oldPath = productoSinCategoria.imagen.split('/productos/')[1];
        await supabase.storage.from('productos').remove([oldPath]);
      }

      //Creamos nueva imagen

      if (producto.imagenFile) {
        const { data, error: errorPostImage } = await supabase.storage.from('productos').upload(`${Date.now()}-${producto?.imagenFile.name}`, producto.imagenFile);
        if (errorPostImage) {
          return false;
        }

        const { data: publicURL } = await supabase.storage.from('productos').getPublicUrl(data.path);
        imagenNueva = publicURL.publicUrl;
      }
    }

    const { error } = await supabase
      .from('Producto')
      .update({
        ...productoSinCategoria,
        imagen: imagenNueva === '' ? productoSinCategoria.imagen : imagenNueva,
      })
      .eq('id', producto.id);
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
        En la cuarta funcion vamos a eliminar un producto

        lo que hacemos es eliminar el producto de la base de datos

        Si existe algun error lo mostramos y devolvemos false

        Tarea: Preguntar a Juan si realmente tenemos que eliminar los productos
    */

export const startDeleteProducto = async (id: number): Promise<boolean> => {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from('Producto')
      .update({
        mostrar: false,
      })
      .eq('id', id);
    if (error) {
      return false;
    }
    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  }
};
