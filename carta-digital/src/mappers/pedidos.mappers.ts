import { Pedido } from "@/interface";

type PedidosFromBackend = {
    id: number;
    created_at: Date;
    cliente: string;
    telefono: string;
    direccion: string;
    envio: boolean;
    vuelto: number;
    total: number;
    estado: string;
    usuarioId: number;
    rotiseriaId: number
};


// Mappear una solo pedido
export function mapPedidoFromBackend(data: PedidosFromBackend): Pedido {
    return {
        id: data.id,
        created_at: data.created_at,
        cliente: data.cliente,
        telefono: data.telefono,
        direccion: data.direccion,
        envio: data.envio,
        vuelto: data.vuelto,
        total: data.total,
        estado: data.estado,
        usuarioId: data.usuarioId,
        rotiseriaId: data.rotiseriaId
    };
};


export function mapPedidosFromBackend(data: PedidosFromBackend[]): Pedido[] {
    return data.map(mapPedidoFromBackend);
};