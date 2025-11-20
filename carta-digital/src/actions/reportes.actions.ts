/*
    En este archivo definimos varias funciones de consulta a supabase que son procediminetos guardados en la base de adtos

    Si vemos Swal.fire es un cartel de informacion para el usuario de que ocurrio algo
*/

import { TipoPago } from "@/interface/Reporte";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";


/* 
    En esta interface definimos la estructura de los productos mas vendidos para mostralos en la parte de reportes
*/

interface ProductosPopulares {
    descripcion: string;
    total_vendido: number;
    cantidad_total: number
}

export const reporteActions = () => {

    /*
    
    En esta funcion obtenemos el resumen financiero de una rotiseria
    Nos devuelve un objeto con la informacion de el importe de ventas, de gastos, ganancia neta y el porcentaje de ganancia

    Si da un error devolvemos un false sino el objeto

    Tarea: Hacer la interface de resumen financiero
    
    */
    const startGetReportesForDate = async (desde: string, hasta: string, rotiseriaId: number): Promise<any> => {
        try {
            const { data, error } = await supabase.rpc('obtener_resumen_financiero', {
                p_desde: new Date(desde + "T00:00:00"),
                p_hasta: new Date(hasta + "T23:59:59"),
                p_rotiseriaid: rotiseriaId
            });

            if (error) {
                await Swal.fire('Error al obtener los reportes', error.message, 'error');
                return false;
            }

            return data;
        } catch (error) {
            console.log(error);
            return false
        }
    };


    /*
        En esta funcion obtenemos los productos mas vendidos de una rotiseria entre las fechas seleccionadas con un maximo de 10 productos
        Nos devuelve un array de objetos con la informacion de la descripcion del producto, el total vendido y la cantidad total


        Si da un error devolvemos un false sino el array
    */

    const startGetMostPopularProducto = async (desde: string, hasta: string, rotiseriaId: number): Promise<ProductosPopulares[]> => {
        try {
            const { data, error } = await supabase.rpc('obtener_productos_mas_vendidos', {
                p_desde: new Date(desde + "T00:00:00"),
                p_hasta: new Date(hasta + "T23:59:59"),
                p_rotiseriaid: rotiseriaId
            });

            if (error) {
                await Swal.fire('Error al obtener los productos', error.message, 'error');
                return [];
            };

            return data;
        } catch (error) {
            console.log(error);
            return [];
        }

    };


    /*
        En esta funcion lo que hacemos es consultar informacion de el tipo de pago (Efectivo o Transferencia ) y devolver un array con cada uno de esos y el importe
        para mostrar cuando se abona con trasferencia y cuanto con efectivo entre las fechas pasadas


        Si da un error devolvemos un false sino el array
    */

    const startGetTipoPagoPedido = async (desde: string, hasta: string, rotiseriaId: number): Promise<TipoPago[]> => {
        try {
            const { data, error } = await supabase.rpc('obtener_tipopago_ventas', {
                p_desde: new Date(desde + "T00:00:00"),
                p_hasta: new Date(hasta + "T23:59:59"),
                p_rotiseriaid: rotiseriaId
            });
            console.log(data)

            if (error) {
                await Swal.fire('Error al obtener los tipo de pagos de los pedidos', error.message, 'error');
                return [];
            };

            return data;
        } catch (error: any) {
            console.log(error);
            await Swal.fire('Error inesperado al obtener los tipos de los pagos de los pedidos', error.message, 'error');
            return []
        }
    }


    return {
        startGetReportesForDate,
        startGetMostPopularProducto,
        startGetTipoPagoPedido
    }
}