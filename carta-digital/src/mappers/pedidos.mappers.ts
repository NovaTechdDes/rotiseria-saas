import { Pedido } from '@/interface';

type PedidosFromBackend = {
  id: number;
  created_at: Date;
  cliente: string;
  telefono: string;
  direccion: string;
  envio: string;
  vuelto: number;
  total: number;
  estado: string;
  observaciones: string;
  tipoPago: string;
  mostrar: boolean;
  rotiseriaId: number;
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
    observaciones: data.observaciones,
    tipoPago: data.tipoPago,
    mostrar: data.mostrar,
    rotiseriaId: data.rotiseriaId,
  };
}

export function mapPedidosFromBackend(data: PedidosFromBackend[]): Pedido[] {
  return data.map(mapPedidoFromBackend);
}
