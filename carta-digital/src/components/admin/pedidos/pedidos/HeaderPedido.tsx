'use client';
import { Pedido } from '@/interface';
import { usePedidoStore } from '@/store';
import { ShoppingBag } from 'lucide-react';

interface Props {
  pedidos?: Pedido[];
}

export const HeaderPedido = ({ pedidos = [] }: Props) => {
  const { desde, hasta, setDesde, setHasta } = usePedidoStore();

  return (
    <div className="flex justify-between">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-800 flex items-center gap-3">
          <ShoppingBag className="text-orange-600" />
          Pedidos
        </h1>
        <p className="text-gray-500 mt-1">
          Total: <span className="font-bold text-gray-800">{pedidos?.length || 0} pedidos</span>
        </p>
      </div>

      <div className="flex gap-2 text-black">
        <div className="flex-col flex gap-2">
          <label className="text-sm font-semibold" htmlFor="desde">
            Desde
          </label>
          <input value={desde} onChange={(e) => setDesde(e.target.value)} type="date" name="desde" className="border p-2 border-gray-300 rounded-md" id="desde" />
        </div>
        <div className="flex-col flex gap-2">
          <label className="text-sm font-semibold" htmlFor="hasta">
            Hasta
          </label>
          <input value={hasta} onChange={(e) => setHasta(e.target.value)} type="date" name="hasta" className="border p-2 border-gray-300 rounded-md" id="hasta" />
        </div>
      </div>
    </div>
  );
};
