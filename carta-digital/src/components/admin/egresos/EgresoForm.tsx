import React, { useEffect } from 'react';
import { useForm } from '@/hooks/useForm';
import { Egreso } from '@/interface';
import { useTipoEgresos } from '@/hooks/tipoEgresos/useTipoEgresos';
import Swal from 'sweetalert2';
import { useRotiseriaStore } from '@/store';

interface Props {
  rotiseriaId: number;
  onClose: () => void;
  onSubmit: (egreso: Egreso) => Promise<boolean>;
}

const initialEgreso: Egreso = {
  descripcion: '',
  importe: 0,
  tipoEgresoId: 0,
  rotiseriaId: 0,
};

export const EgresoForm = ({ rotiseriaId, onClose, onSubmit }: Props) => {
  const { data: tiposEgresos, isLoading } = useTipoEgresos();
  const { formState, onInputChange, onResetForm, descripcion, importe, tipoEgresoId } = useForm(initialEgreso);

  useEffect(() => {
    onInputChange({ target: { name: 'rotiseriaId', value: rotiseriaId } });
  }, [rotiseriaId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (descripcion.trim().length === 0) return Swal.fire('Error', 'La descripción es obligatoria', 'error');
    if (importe <= 0) return Swal.fire('Error', 'El importe debe ser mayor a 0', 'error');
    if (Number(tipoEgresoId) === 0) return Swal.fire('Error', 'Debe seleccionar un tipo de egreso', 'error');

    const success = await onSubmit(formState as Egreso);
    if (success) {
      onClose();
      onResetForm();
    }
  };

  if (isLoading) return <p>Cargando tipos de egresos...</p>;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Nuevo Egreso</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={descripcion}
              onChange={onInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black focus:ring-orange-500 focus:border-orange-500"
              placeholder="Ej: Compra de mercadería"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Importe</label>
            <input
              type="number"
              name="importe"
              value={importe}
              onChange={onInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black focus:ring-orange-500 focus:border-orange-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Egreso</label>
            <select
              name="tipoEgresoId"
              value={tipoEgresoId}
              onChange={onInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black focus:ring-orange-500 focus:border-orange-500"
            >
              <option value={0}>Seleccione un tipo</option>
              {tiposEgresos?.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
