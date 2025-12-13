import { ListaProductos } from "@/store/useCarritoStore";

export interface PedidoWhatsApp {
  cliente: string;
  telefono: string;
  direccion: string;
  tipoPago: string;
  envio: boolean;
  observaciones: string;
  productos: ListaProductos[] | null;
  vuelto: number;
  total: number;
  descuento?: number;
}

export const enviarMensajeWhatsApp = (pedido: PedidoWhatsApp, telefonoRotiseria: string) => {
  const detallePedido = pedido.productos
    ?.map(
      (p, index) =>
        `${index + 1}- ${p.producto.nombre} (${p.cantidad} UNIDAD/ES) - $${(
          (p.producto.precio ?? 0) * p.cantidad
        ).toFixed(2)}`
    )
    .join('\n');

  const mensaje = `Hola, Realice un pedido desde la carta online, ¿Podrian Confirmarlo?
  Nombre: ${pedido.cliente}
  Telefono: ${pedido.telefono}
  Domicilio: ${pedido.direccion}
  Forma de Pago: ${pedido.tipoPago === 'transferencia' ? 'Transferencia' : 'Efectivo'}
  Entrega: ${pedido.envio ? 'Enviar A Domicilio' : 'Lo paso a retirar'}

  Detalle del Pedido:
  ${detallePedido}

  Observaciones: ${pedido.observaciones ? pedido.observaciones.toUpperCase() : 'NINGUNA'}

  ${pedido.tipoPago === 'efectivo' && pedido.envio ? `Voy a Pagar con: $${pedido.vuelto.toFixed(2)}` : ''}

  Total del Pedido: $${pedido.total.toFixed(2)}`;

  const url = `https://wa.me/${telefonoRotiseria}?text=${encodeURIComponent(mensaje)}`;
  
  window.open(url, '_blank');
};
