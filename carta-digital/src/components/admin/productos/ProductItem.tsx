import { useMutateProductos } from '@/hooks';
import { Producto } from '@/interface';
import { ImageIcon, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Swal from 'sweetalert2';

interface Props {
  producto: Producto;
  onEdit: (producto: Producto) => void;
}

export const ProductItem = ({ producto, onEdit }: Props) => {
  const { eliminarProducto } = useMutateProductos();

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      eliminarProducto.mutate(id);
      Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success');
    }
  };

  if (producto.mostrar === false) return null;

  return (
    <div key={producto.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* Image Section */}
      <div className="h-48 w-full bg-gray-200 relative">
        {producto.imagen ? (
          <Image priority width={500} height={500} src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <ImageIcon size={48} />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1" title={producto.nombre}>
            {producto.nombre}
          </h3>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{producto.descripcion}</p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-orange-500 text-sm font-semibold capitalize">{producto.Categoria?.nombre || 'Sin categoría'}</span>
          <span className="text-xl font-bold text-gray-900">${producto.precio.toFixed(2)}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={() => onEdit(producto)}
            className="flex-1 bg-white cursor-pointer border border-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Pencil size={16} /> Editar
          </button>
          <button onClick={() => handleDelete(producto.id!)} className="bg-red-50 border border-red-100 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors" title="Eliminar">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
