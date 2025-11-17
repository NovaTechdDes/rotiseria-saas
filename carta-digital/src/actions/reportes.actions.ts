import { TipoPago } from "@/interface/Reporte";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";
interface ProductosPopulares {
    descripcion: string;
    total_vendido: number;
    cantidad_total: number
}

export const reporteActions = () => {
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