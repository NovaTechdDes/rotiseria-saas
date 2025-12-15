'use client';
import { useProductoStore } from '@/store';

export const BuscadorProductos = () => {
  const { filtro, setFiltro } = useProductoStore();

  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar comida..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full p-4 pl-12 rounded-xl border-none shadow-sm
           bg-white focus:ring-2 focus:ring-orange-100 focus:outline-none
           text-gray-700 placeholder-gray-400 dark:bg-slate-800 dark:text-gray-200 dark:placeholder-gray-400"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
      </div>
    </div>
  );
};
