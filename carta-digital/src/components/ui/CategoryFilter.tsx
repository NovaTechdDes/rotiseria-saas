'use client';

interface CategoryFilterProps {
  categorias: string[];
  categoriaActiva: string;
  setCategoriaActiva: (cat: string) => void;
}

export const CategoryFilter = ({ categorias, categoriaActiva, setCategoriaActiva }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide py-4">
      {/* Botón "Todos" */}
      <button
        onClick={() => setCategoriaActiva('Todos')}
        className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
          categoriaActiva === 'Todos'
            ? 'bg-orange-500 text-white shadow-md'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        Todos
      </button>

      {/* Resto de categorías */}
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategoriaActiva(cat)}
          className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
            categoriaActiva === cat
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};