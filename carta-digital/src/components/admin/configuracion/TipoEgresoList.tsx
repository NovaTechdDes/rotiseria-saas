import React from 'react';
import { TipoEgreso } from '@/interface';
import { useMutateTipoEgresos } from '@/hooks/tipoEgresos/useMutateTipoEgresos';
import Swal from 'sweetalert2';
import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  tiposEgresos: TipoEgreso[];
  onEdit: (tipo: TipoEgreso) => void;
}

export const TipoEgresoList = ({ tiposEgresos, onEdit }: Props) => {
  const { eliminarTipoEgreso } = useMutateTipoEgresos();

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
      eliminarTipoEgreso.mutate(id);
      Swal.fire('Eliminado!', 'El tipo de egreso ha sido eliminado.', 'success');
    }
  };

  if (!tiposEgresos || tiposEgresos.length === 0) {
    return (
      <div className="text-center p-10 text-gray-500">
        No se encontraron tipos de egresos.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tiposEgresos.map((tipo) => (
            <tr key={tipo.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {tipo.nombre}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => onEdit(tipo)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(tipo.id!)}
                    className="text-red-600 hover:text-red-900"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
