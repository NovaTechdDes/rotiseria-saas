'use server';

import { PedidoCard } from '@/components/admin/pedidos/pedidos/PedidoCard';
import { ShoppingBag } from 'lucide-react';
import { HeaderPedido } from '@/components/admin/pedidos/pedidos/HeaderPedido';
import { startGetPedidos, startGetRotiseriaForDominio } from '@/actions';
import { headers } from 'next/headers';

const PedidosPage = async () => {
  const currentDomain = (await headers()).get('host')?.split('.')[0];
  const rotiseriaActive = await startGetRotiseriaForDominio(currentDomain || '');

  // Traemos los pedidos de la base de datos
  const pedidos = await startGetPedidos(rotiseriaActive?.id || 0, '2025-12-01', '2025-12-31');

  return (
    <div>
      {/* Header de la Página */}
      <HeaderPedido pedidos={pedidos} />

      {/* Lista de Pedidos */}
      {pedidos && pedidos.length > 0 ? (
        <div className="max-w-4xl">
          {pedidos.map((pedido) => (
            <PedidoCard key={pedido.id} pedido={pedido} />
          ))}
        </div>
      ) : (
        // Estado Vacío (Empty State)
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="bg-orange-50 p-4 rounded-full mb-4">
            <ShoppingBag size={40} className="text-orange-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No hay pedidos registrados</h3>
          <p className="text-gray-500">Los pedidos nuevos aparecerán aquí automáticamente.</p>
        </div>
      )}
    </div>
  );
};

export default PedidosPage;
