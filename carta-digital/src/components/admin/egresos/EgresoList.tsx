import React from 'react';
import { Egreso } from '@/interface';
import { useMutateEgresos } from '@/hooks/egresos/useMutateEgresos';
import Swal from 'sweetalert2';
import { Trash2 } from 'lucide-react';

interface Props {
  egresos: Egreso[];
}

export const EgresoList = ({ egresos }: Props) => {
  const { eliminarEgreso } = useMutateEgresos();

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
      eliminarEgreso.mutate(id);
      Swal.fire('Eliminado!', 'El egreso ha sido eliminado.', 'success');
    }
  };

  if (!egresos || egresos.length === 0) {
    return (
      <div className="text-center p-10 text-gray-500">
        No se encontraron egresos.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {egresos.map((egreso) => (
        <div
          key={egreso.id}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">
              {egreso.descripcion}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {egreso.TipoEgreso?.nombre} •{' '}
              {new Date(egreso.created_at!).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xl font-bold text-orange-600">
              {new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                minimumFractionDigits: 0,
              }).format(egreso.importe)}
            </span>
            <button
              onClick={() => handleDelete(egreso.id!)}
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
