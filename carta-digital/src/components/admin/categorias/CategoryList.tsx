import React from 'react';
import { useMutateCategorias } from '@/hooks/categorias/useMutateCategoria';
import { Categoria } from '@/interface';
import Swal from 'sweetalert2';
import { Pencil, Trash2, Folder } from 'lucide-react';

interface Props {
  categories: Categoria[];
  onEdit: (category: Categoria) => void;
}

export const CategoryList = ({ categories, onEdit }: Props) => {
  const { eliminarCategoria } = useMutateCategorias();

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarla!',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      eliminarCategoria.mutate(id);
      Swal.fire('Eliminado!', 'La categoría ha sido eliminada.', 'success');
    }
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center p-10 text-gray-500">
        No se encontraron categorías.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((categoria) => (
        <div
          key={categoria.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100 flex flex-col"
        >
          <div className="flex items-start space-x-4 mb-4">
            <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
              <Folder size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800">
                {categoria.nombre}
              </h3>
              {/* Placeholder for product count if available in the future */}
              <p className="text-sm text-gray-500">Categoría</p>
            </div>
          </div>

          <div className="flex gap-3 mt-auto pt-4 border-t border-gray-50">
            <button
              onClick={() => onEdit(categoria)}
              className="flex-1 bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Pencil size={16} /> Editar
            </button>
            <button
              onClick={() => handleDelete(categoria.id!)}
              className="bg-red-50 border border-red-100 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
              title="Eliminar"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
