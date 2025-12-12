'use server';
import { Pedido } from '@/interface';
import { supabase } from '@/lib/supabase';
import { createClient } from '@/utils/supabase/server';

/*
    En este archivo se encuentran las acciones de los pedidos a la base de datos para metodos Crud

    Cuuando veamos Swal lo que haermos es mostrar un mensaje de error que surgio para informar al cliente

    

*/
/*
        En la primera funcion lo que hacemos es obtener todos los pedidos de la rotiseria, 
        para ello usamos el select de supabase para obtener todos los pedidos de la rotiseria
        y los movimientos de los productos que guardaron. Solo trae los pedidios que no fueron cancelados

        Si existe algun error lo mostramos y devolvemos un array vacio
    */

export const startGetPedidos = async (id: number, desde: string, hasta: string): Promise<Pedido[] | []> => {
  console.log('Id Rotiseria', id);
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('Pedido')
      .select('*, movProductos:MovProducto(*)')
      .eq('rotiseriaId', id)
      .gte('created_at', `${desde}T00:00:00+00:00`)
      .lte('created_at', `${hasta}T23:59:59+00:00`)
      .eq('mostrar', true)
      .order('created_at', { ascending: false });
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
        Para cargar un pedido lo pasamos por parametro y despues tenemos que buscar el usuario que esta logueado
        para obtener su id y luego insertar el pedido en la base de datos

        Luego en pedidos.productos traemos la lista de productos que se pidio y tenemos que guardarlo en la base de datos como movProductos para una posterior visualizacion
        Entonces para ello creamos un array de productos planos que solo tenga la informacion que necesitamos para insertar en la base de datos
        Luego llamamos a rpc (create_ventas_con_productos) que es el procedimiento almacenado que creamos en supabase el cual crea el pedido y los mov de produuctos todo juntos
        Si da un error lo mostramos y devolvemos false

        Si existe algun error lo mostramos y devolvemos false
  */

export const startPostPedido = async (pedido: Pedido): Promise<boolean> => {
  try {
    const productosPlanos = pedido.productos?.map((item) => ({
      cantidad: item.cantidad,
      precioUnitario: item.producto.precio,
      descripcion: item.producto.nombre,
      productoId: item.producto.id,
      rotiseriaId: item.producto.rotiseriaId,
    }));

    const { error } = await supabase.rpc('create_ventas_con_productos', {
      p_cliente: pedido.cliente,
      p_total: pedido.total,
      p_estado: pedido.estado,
      p_telefono: pedido.telefono,
      p_direccion: pedido.direccion,
      p_envio: pedido.envio,
      p_vuelto: pedido.vuelto,
      p_observaciones: pedido.observaciones,
      p_tipopago: pedido.tipoPago,
      p_rotiseriaid: pedido.rotiseriaId,
      p_productos: productosPlanos,
    });
    if (error) {
      console.error(error);

      return false;
    }

    return true;
  } catch (error: any) {
    return false;
  }
};

/*
        En esta funcion pasamos por parametro el pedido parcial ya que hay datos que no se modifican quisas y lo que hacemos es actualizarla en la base de datos;

        Si existe algun error lo mostramos y devolvemos false y sino devolvemos true
    */

export const startUpdatePedido = async (pedido: Partial<Pedido>): Promise<{ ok: boolean; msg: string }> => {
  const supabase = await createClient();
  try {
    const { movProductos, ...pedidoSinMov } = pedido;
    console.log(pedido);

    const { error, data } = await supabase.from('Pedido').update(pedidoSinMov).eq('id', pedido.id);
    console.log({ error, data });

    if (error) {
      return {
        ok: false,
        msg: error.message,
      };
    }
    return {
      ok: true,
      msg: 'Pedido actualizado',
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      msg: error.message,
    };
  }
};

/*
        En esta funcion para eliminar el pedido en realidad no lo eliminamos de la base de datos
        sino que lo marcamos como no mostrar para que no aparezca visualmente

        Si existe algun error lo mostramos y devolvemos false y sino devolvemos true
    */

export const startDeletePedido = async (id: number): Promise<{ ok: boolean; msg: string }> => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('Pedido').update({ mostrar: false }).eq('id', id);

    if (error) {
      console.error(error);
      return {
        ok: false,
        msg: error.message,
      };
    }
    return {
      ok: true,
      msg: 'Pedido eliminado',
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      msg: error.message,
    };
  }
};
