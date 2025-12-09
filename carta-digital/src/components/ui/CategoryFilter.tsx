'use client';

import { Categoria } from '@/interface';
import { useCategoriaStore } from '@/store';

interface CategoryFilterProps {
  categorias: Categoria[];
}

export const CategoryFilter = ({ categorias }: CategoryFilterProps) => {
  const { categoriaSeleccionada, setCategoriaSeleccionada } = useCategoriaStore();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide py-4">
      {/* Botón "Todos" */}
      <button
        onClick={() => setCategoriaSeleccionada(0)}
        className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
          categoriaSeleccionada === 0 ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        Todos
      </button>

      {/* Resto de categorías */}
      {categorias.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategoriaSeleccionada(cat?.id ?? 0)}
          className={`px-6 py-2 capitalize rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
            categoriaSeleccionada === cat.id ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {cat.nombre}
        </button>
      ))}
    </div>
  );
};
