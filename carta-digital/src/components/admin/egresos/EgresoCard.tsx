import { mensaje } from '@/helpers/mensaje';
import { useMutateEgresos } from '@/hooks';
import { Egreso } from '@/interface';
import { Trash2 } from 'lucide-react';
import React from 'react';
import Swal from 'sweetalert2';

interface Props {
  egreso: Egreso;
}

export const EgresoCard = ({ egreso }: Props) => {
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
      const ok = await eliminarEgreso.mutateAsync(id);
      console.log(ok);
      mensaje('Eliminado!', 'success');
    }
  };

  if (!egreso.mostrar) return null;

  return (
    <div key={egreso.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800 capitalize">{egreso.descripcion}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {egreso.TipoEgreso?.nombre} • {new Date(egreso.created_at!).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-xl font-bold text-orange-600">
          {new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
          }).format(egreso.importe)}
        </span>
        <button onClick={() => handleDelete(egreso.id!)} className="bg-red-50 border cursor-pointer border-red-100 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors" title="Eliminar">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};
